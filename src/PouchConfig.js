import {
    array,
    extract,
    first,
    isString,
    map,
    promise,
    remove,
    results,
    warn,
} from "./utils";

/**
 * The PouchConfig plugin provides a simple key/value system with that provides
 * setters & getters. The key difference between the native functions is how
 * the documents are retrieved and written to the database. Config documents
 * never expire and can only be removed or overwritten.
 * 
 * @example
 * await db.cache('config1', 1);
 * await db.cache('config2', 2);
 * 
 * // Returns {
 * //   config1: 1,
 * //   config2: 2,
 * // }
 * await db.cache();
 * 
 * @example
 * // Returns `1`
 * await db.config('key1', 1);
 * 
 * @example
 * // Returns `2`
 * await db.config('key2', () => 2);
 * 
 * @example
 * // Returns `3`
 * await db.config('key3', Promise.resolve(3));
 * 
 * @example
 * // Returns `4`
 * await db.config('key4', () => Promise.resolve(4));
 * 
 * @example
 * await db.config('key1', 1);
 * await db.config('key2', 2);
 * 
 * // Returns `{key1: 1, key2: 2}`
 * await db.config(['key1', 'key2']);
 * 
 * @example
 * await db.config('key1', 1);
 * 
 * // Returns `{id: 'key1', rev: 'some-revision-hash-here'}`
 * await db.removeConfig('key1');
 * 
 * @example
 * await db.config('key1', 1);
 * await db.config('key2', 2);
 * 
 * // Returns `{
 * //   key1: {id: 'key1', rev: 'some-revision-hash-here'}`
 * //   key2: {id: 'key2', rev: 'some-revision-hash-here'}`
 * // }
 * await db.removeConfig(['key1', 'key2]);
 */
export default {
    /**
     * The primary method for interfacing with the config documents. If a data
     * parameter is passed, the method will set the value to a single key.
     * Otherwise, the method will act a getter, which can be used to retrieve
     * one or more documents. If an array of keys (or no keys) are passed, an
     * an object of key/value pairs is return. Whereas, if only a single key is
     * passed, the method will just return the literal value.
     * 
     * @param {array|string} key
     * @param {any} data
     * @returns {Promise}
     */
    async config(...args) {
        const [ key, data] = args;

        // Check for matching config docs using the specified key(s).
        const docs = await this.findConfig(key);

        // If a key is passed, use the method as getter for the specified keys.
        if(args.length <= 1) {
            // Convert the docs to results.
            const existing = map(docs, '_id', key);
    
            return results(existing, value => {
                return extract(value, '$value');
            });
        }

        // Make sure the key is a string when the method is being used a setter.
        if(!isString(key)) {
            throw new Error(
                'The key must be a string when config() is being used a setter.'
            );
        }

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
        
        // Create the new config doc.
        const doc = Object.assign({
            _id: key,
            _rev,
            $value,
            $config: true,
        });
        
        // Put the doc in the database
        await this.put(doc);

        // Return the newly created doc.
        return $value;
    },

    /**
     * Build the config selector for the pouch-find plugin.
     * 
     * @param {array} key 
     * @returns {object}
     */
    configSelector(key = []) {
        return {
            selector: {
                // If the keys array is empty, include all keys in the search
                _id: {
                    [key.length ? '$in' : '$nin']: key
                },
                // Check for the `$expiredAt` property, which ensures the doc is
                // a  config document.
                $config: {
                    $exists: true,
                }
            }
        };
    },

    /**
     * Create the config database index.
     * 
     * @returns {Promise}
     */
    async createConfigIndex() {
        return await this.createIndex({
            index: {
                fields: ['$config']
            }
        });
    },

    /**
     * Find the config documents using the specified keys.
     * 
     * @param {array|string} key 
     * @returns {Promise}
     */
    async findConfig(key) {
        // Find the matching config docs by key(s).
        const { docs, warning } = await this.find(
            this.configSelector(array(key))
        );
        
        // Log the query warning in the console if it exists.
        warn(warning);

        return docs;
    },

    /**
     * Remove the config documents using the specified key(s).
     * 
     * @param {array|string} key 
     * @returns {Promise}
     */
    async removeConfig(key) {
        return await remove(this, await this.findConfig(key));
    }
};