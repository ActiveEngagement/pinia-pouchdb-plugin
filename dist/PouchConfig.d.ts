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
declare const _default: {
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
    config(...args: any[]): Promise<any>;
    /**
     * Build the config selector for the pouch-find plugin.
     *
     * @param {array} key
     * @returns {object}
     */
    configSelector(key?: any[]): {
        selector: {
            _id: {
                [x: string]: any[];
            };
            $config: {
                $exists: boolean;
            };
        };
    };
    /**
     * Create the config database index.
     *
     * @returns {Promise}
     */
    createConfigIndex(): Promise<any>;
    /**
     * Find the config documents using the specified keys.
     *
     * @param {array|string} key
     * @returns {Promise}
     */
    findConfig(key: any): Promise<any>;
    /**
     * Remove the config documents using the specified key(s).
     *
     * @param {array|string} key
     * @returns {Promise}
     */
    removeConfig(key: any): Promise<any>;
};
export default _default;
