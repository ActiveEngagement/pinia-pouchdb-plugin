import {
    array,
    date, 
    extract,
    first,
    isString,
    map, 
    promise, 
    remove, 
    results, 
    warn
} from './utils';

/**
 * The PouchCache plugin provides a simple key/value system with that provides
 * setters & getters for documents that may or may not expire. A key difference
 * between the native functions is how the documents are retrieved and written
 * to the database. Cache documents expiration is set using a Date object or
 * specifiy the number of seconds. Cache documents may never expire by passing
 * null.
 * 
 * @example
 * await db.cache('cache1', 1);
 * await db.cache('cache2', 2);
 * 
 * // Returns {
 * //   cache1: 1,
 * //   cache2: 2,
 * // }
 * await db.cache();
 * 
 * @example
 * // Returns `1` for 5 minutes
 * await db.cache('key1', 1, 300);
 *  
 * @example
 * // Returns `2` until the value is deleted or overwritten
 * await db.cache('key2', () => 2);
 * 
 * @example
 * // Returns `3` for 5 minutes
 * await db.cache('key3', Promise.resolve(3), 300);
 * 
 * @example
 * // Returns `4` for 5 minutes
 * await db.cache('key4', () => Promise.resolve(4), 300);
 * 
 * @example
 * await db.cache('key1', 1, 300);
 * await db.cache('key2', 2, 300);
 * 
 * // Returns `{key1: 1, key2: 2}` for 5 minutes
 * await db.cache(['key1', 'key2']);
 * 
 * @example
 * await db.cache('key1', 1);
 * 
 * // Returns `{id: 'key1', rev: 'some-revision-hash-here'}`
 * await db.purge('key1');
 * 
 * @example
 * await db.cache('key1', 1);
 * await db.cache('key2', 2);
 * 
 * // Returns `{
 * //   key1: {id: 'key1', rev: 'some-revision-hash-here'}`
 * //   key2: {id: 'key2', rev: 'some-revision-hash-here'}`
 * // }
 * await db.purge(['key1', 'key2]);
 */
export default {
    /**
     * The primary method for interfacing with the cache documents. If a data
     * parameter is passed, the method will set the value to a single key. By
     * specified a length, the cache will expire after the specified date and
     * time. Otherwise, the method will act a getter, which can be used to
     * retrieve one or more documents. If an array of keys (or no keys) are
     * passed, an object of key/value pairs is return. Whereas, if only a single
     * key is passed, the method will just return the literal value.
     * 
     * @param {string|array} key 
     * @param {any} data 
     * @param {Date|number|null} length 
     * @returns {Promise}
     */
    async cache(...args) {
        const [ key, data, length ] = args;
        
        // Clear the expired cache
        await this.clearExpiredCache(key);

        // Check for matching cache docs using the specified key(s).
        const docs = await this.findCache(key);
            
        // If a key is passed or an existing cache document is found, use the
        // method as getter for the specified keys. The key difference between
        // this method and `config()` equivelant, is the existing cache value
        // is returned, even if a setter is preset as long at the existing
        // cache document has not expired.
        if(args.length <= 1 || docs.length) {
            // Convert the docs to results.
            const existing = map(docs, '_id', key);

            return results(existing, value => {
                return extract(value, '$value');
            });
        }

        // Make sure the key is a string when the method is being used a setter.
        if(!isString(key)) {
            throw new Error(
                'The key must be a string when cache() is being used a setter.'
            );
        }

        // If the length is a Date instance, then use the instance. Otherwise
        // check if length is a numberic value and assume to be the number of
        // seconds until the cache expires. If neither Date or number, then the
        // cache will never expire until its manually purged.
        const $expiredAt = length instanceof Date ? length : (
            typeof length === 'number' ? date(length) : null
        );
        
        // Evaluate data as a promise to extract the literal value.
        // Data can be passed as a Promise, function, or literal value.
        let $value = await promise(data);

        // The value must be stringified and parsed to remove observers
        // and other invalid JSON that can't be saved in the db.
        if($value !== undefined) {
            $value = JSON.parse(JSON.stringify($value));
        }

        // Get the first revision from the array of docs so we can update the
        // existing doc, if it exists.
        const { _rev } = first(docs) || {};

        // Create the new cache doc.
        const doc = Object.assign({
            _id: key,
            _rev,
            $value,
            $expiredAt,
        });

        // Put the doc in the database
        await this.put(doc);

        // Return the newly created doc.
        return $value;
    },

    /**
     * Build the cache selector for the pouch-find plugin.
     * 
     * @param {string|array} key
     * @param {Date|number|null} expiration
     * @param {boolean} showExpired
     * @returns {object}
     */
    cacheSelector(key = [], expiration = null, showExpired = false) {
        // Merge the expiration selector into the object.
        return {
            selector: this.mergeCacheExpirationSelector({
                // If the keys array is empty, include all keys in the search
                _id: {
                    [key.length ? '$in' : '$nin']: key
                },
                // Check for the `$expiredAt` property, which ensures the doc is a
                // cached document.
                $expiredAt: {
                    $exists: true,
                },
                // Check for the `$value` property, which ensures the doc is a
                // cached document
                $value: {
                    $exists: true
                },
            }, expiration, showExpired)
        };
    },

    /**
     * Clear the expired cache using the specified keys
     * 
     * @param {string|array} key 
     * @returns {Promise}
     */
    async clearExpiredCache(key) {
        const docs = await this.findCache(array(key), new Date(), true);

        return await Promise.all(
            Object.entries(docs).map(([key, doc]) => {
                return doc && this.remove(doc._id, doc._rev);
            })
        );
    },

    /**
     * Create the cache database index.
     * 
     * @returns {Promise}
     */
    async createCacheIndex() {
        return await this.createIndex({
            index: {
                fields: ['$expiredAt', '$value']
            }
        });
    },
    
    /**
     * Find the cache documents using the specified keys. This methods defaults
     * to only returning documents that have not expired using the current date
     * and time.
     * 
     * @param {string|array} key
     * @param {Date|number|null} expiration
     * @param {boolean} showExpired
     * @returns {Promise}
     */
    async findCache(key = undefined, expiration = undefined, showExpired = false) {
        // If the expiration date is undefined, just assume it to be now.
        // To ignore the expiration date, pass null.
        if(expiration === undefined) {
            expiration = new Date;
        }

        // Use pouch-find to run a query against the index.
        const { docs, warning } = await this.find(
            this.cacheSelector(array(key), expiration, showExpired)
        );
        
        // Log the query warning in the console if it exists.
        warn(warning);

        return docs;
    },

    /**
     * Find the expired cache relative to the specified date and time. If no
     * expired specified, then use the current date and time.
     * 
     * @param {string|array} key
     * @param {Date|number|null} expiration
     * @returns {Promise}
     */
    async findExpiredCache(key, expiration = null) {
        return await this.findCache(key, true, expiration || new Date);
    },

    /**
     * Merge the expiration selector with the subject.
     * 
     * @param {object} subject
     * @param {Date|number|null} expiration
     * @param {boolean} showExpired
     * @returns {object}
     */
    mergeCacheExpirationSelector(subject, expiration = null, showExpired = false) {
        // If expiration is not an instance of a Date, just return the subject.
        if(!(expiration instanceof Date)) {
            return subject;
        }
        
        return Object.assign(subject, {
            [showExpired ? '$and' : '$or']: [{
                $expiredAt: {
                    [showExpired ? '$lte' : '$gt']: expiration
                }
            },{
                $expiredAt: {
                    [showExpired ? '$ne' : '$eq']: null
                }
            }]
        });
    },
      
    /**
     * Remove the cache documents using the specified key(s). This method is an
     * alias to `removeCache()` to keep the naming consistent, but also
     * backwards compatible with previous versions.
     * 
     * @alias removeCache
     * @param {array|string} key 
     * @returns {Promise}
     */
    async purge(key) {
        return await remove(this, await this.findCache(key));
    },

    /**
     * Remove the cache documents using the specified key(s).
     * 
     * @param {array|string} key 
     * @returns {Promise}
     */
    async removeCache(key) {
        return await remove(this, await this.findCache(key));
    }
};