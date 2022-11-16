/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
/**
 * The global database instance.
 *
 * @var {PouchDB|undefined}
 */
export declare let db: any;
/**
 * Instantiate a database and set it to the global variable.
 *
 * @param {string} name
 * @param {object} options
 * @returns {PouchDB}
 */
export declare function init(name: string, options?: PouchDB.AdapterWebSql.Configuration): PouchDB.Database;
/**
 * Create the cache and config database indexes.
 */
export declare function createIndex(): Promise<{
    cache: any;
    config: any;
}>;
/**
 * Create the cache database index.
 */
export declare function createCacheIndex(): Promise<{
    cache: any;
    config: any;
}>;
/**
 * Create the config database index.
 */
export declare function createConfigIndex(): Promise<{
    cache: any;
    config: any;
}>;
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
export declare function cache(...args: any[]): Promise<any>;
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
export declare function config(...args: any[]): Promise<any>;
/**
 * Remove the cache documents using the specified key(s). This method is an
 * alias to `removeCache()` to keep the naming consistent, but also
 * backwards compatible with previous versions.
 *
 * @alias removeCache
 * @param {array|string} key
 * @returns {Promise}
 */
export declare function purge(...args: any[]): Promise<any>;
/**
 * Remove the config documents using the specified key(s).
 *
 * @param {array|string} key
 * @returns {Promise}
 */
export declare function removeCache(...args: any[]): Promise<any>;
/**
 * Remove the config documents using the specified key(s).
 *
 * @param {array|string} key
 * @returns {Promise}
 */
export declare function removeConfig(...args: any[]): Promise<any>;
