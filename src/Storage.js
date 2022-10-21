import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import PoucheCache from './PouchCache';
import PoucheConfig from './PouchConfig';

PouchDB.plugin(PouchFind);
PouchDB.plugin(PoucheCache);
PouchDB.plugin(PoucheConfig);

/**
 * The global database instance.
 * 
 * @var {PouchDB|undefined}
 */
export let db;

/**
 * Throw an error if the database has not been initialize.
 * 
 * @throws Will throw an error if the database has not been initialized.
 * @returns {boolean}
 */
function initialized() {
    if(!db) {
        throw new Error(
            'You must initialize with init() before accessing the database.'
        );
    }

    return true;
}

/**
 * Instantiate a database and set it to the global variable.
 * 
 * @param {string} name
 * @param {object} options
 * @returns {PouchDB}
 */
export function init(name, options) {
    return db|| (db = new PouchDB(name, options));
}

/**
 * Create the cache and config database indexes.
 * 
 * @returns {Promise}
 */
export async function createIndex() {
    return initialized() && {
        cache: await db.createCacheIndex(),
        config: await db.createConfigIndex()
    };
}

/**
 * Create the cache database index.
 * 
 * @returns {Promise}
 */
export async function createCacheIndex() {
    return initialized() && await db.createCacheIndex();
}

/**
 * Create the config database index.
 * 
 * @returns {Promise}
 */
export async function createConfigIndex() {
    return initialized() && await db.createConfigIndex();
}

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
export async function cache(...args) {
    return initialized() && await db.cache(...args);
}

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
export async function config(...args) {
    return initialized() && await db.config(...args);
}

/**
 * Remove the cache documents using the specified key(s). This method is an
 * alias to `removeCache()` to keep the naming consistent, but also
 * backwards compatible with previous versions.
 * 
 * @alias removeCache
 * @param {array|string} key 
 * @returns {Promise}
 */
export async function purge(...args) {
    return initialized() && await db.purge(...args);
}

/**
 * Remove the config documents using the specified key(s).
 * 
 * @param {array|string} key 
 * @returns {Promise}
 */
export async function removeCache(...args) {
    return initialized() && await db.removeCache(...args);
}

/**
 * Remove the config documents using the specified key(s).
 * 
 * @param {array|string} key 
 * @returns {Promise}
 */
export async function removeConfig(...args) {
    return initialized() && await db.removeConfig(...args);
}