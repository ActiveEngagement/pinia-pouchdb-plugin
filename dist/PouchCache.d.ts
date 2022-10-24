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
declare const _default: {
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
    cache(...args: any[]): Promise<any>;
    /**
     * Build the cache selector for the pouch-find plugin.
     *
     * @param {string|array} key
     * @param {Date|number|null} expiration
     * @param {boolean} showExpired
     * @returns {object}
     */
    cacheSelector(key?: any[], expiration?: any, showExpired?: boolean): {
        selector: any;
    };
    /**
     * Clear the expired cache using the specified keys
     *
     * @param {string|array} key
     * @returns {Promise}
     */
    clearExpiredCache(key: any): Promise<any[]>;
    /**
     * Create the cache database index.
     *
     * @returns {Promise}
     */
    createCacheIndex(): Promise<any>;
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
    findCache(key?: any, expiration?: any, showExpired?: boolean): Promise<any>;
    /**
     * Find the expired cache relative to the specified date and time. If no
     * expired specified, then use the current date and time.
     *
     * @param {string|array} key
     * @param {Date|number|null} expiration
     * @returns {Promise}
     */
    findExpiredCache(key: any, expiration?: any): Promise<any>;
    /**
     * Merge the expiration selector with the subject.
     *
     * @param {object} subject
     * @param {Date|number|null} expiration
     * @param {boolean} showExpired
     * @returns {object}
     */
    mergeCacheExpirationSelector(subject: any, expiration?: any, showExpired?: boolean): any;
    /**
     * Remove the cache documents using the specified key(s). This method is an
     * alias to `removeCache()` to keep the naming consistent, but also
     * backwards compatible with previous versions.
     *
     * @alias removeCache
     * @param {array|string} key
     * @returns {Promise}
     */
    purge(key: any): Promise<any>;
    /**
     * Remove the cache documents using the specified key(s).
     *
     * @param {array|string} key
     * @returns {Promise}
     */
    removeCache(key: any): Promise<any>;
};
export default _default;
