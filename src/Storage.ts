import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find';
import PouchUpsert from 'pouchdb-upsert';
import PoucheCache from './PouchCache';
import PoucheConfig from './PouchConfig';

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchUpsert);
PouchDB.plugin(PoucheCache);
PouchDB.plugin(PoucheConfig);

/**
 * The global database instance.
 */
export let db: PouchDB.Database;

/**
 * Throw an error if the database has not been initialize.
 */
function initialized(): boolean|never {
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
export function init(name: string, options?: PouchDB.AdapterWebSql.Configuration): PouchDB.Database {
    console.log(PouchDB);
    
    return db || (db = new PouchDB(name, options));
}

// /**
//  * Create the cache and config database indexes.
//  */
// export async function createIndex(): Promise<{cache: any, config: any}> {
//     return initialized() && {
//         cache: await db.createCacheIndex(),
//         config: await db.createConfigIndex()
//     };
// }

// /**
//  * Create the cache database index.
//  */
// export async function createCacheIndex(): Promise<{cache: any, config: any}> {
//     return initialized() && await db.createCacheIndex();
// }

// /**
//  * Create the config database index.
//  */
// export async function createConfigIndex(): Promise<{cache: any, config: any}> {
//     return initialized() && await db.createConfigIndex();
// }

// /**
//  * The primary method for interfacing with the cache documents. If a data
//  * parameter is passed, the method will set the value to a single key. By
//  * specified a length, the cache will expire after the specified date and
//  * time. Otherwise, the method will act a getter, which can be used to
//  * retrieve one or more documents. If an array of keys (or no keys) are
//  * passed, an object of key/value pairs is return. Whereas, if only a single
//  * key is passed, the method will just return the literal value.
//  * 
//  * @param {string|array} key 
//  * @param {any} data 
//  * @param {Date|number|null} length 
//  * @returns {Promise}
//  */
// export async function cache(...args): Promise<any> {
//     return initialized() && await db.cache(...args);
// }

// /**
//  * The primary method for interfacing with the config documents. If a data
//  * parameter is passed, the method will set the value to a single key.
//  * Otherwise, the method will act a getter, which can be used to retrieve
//  * one or more documents. If an array of keys (or no keys) are passed, an
//  * an object of key/value pairs is return. Whereas, if only a single key is
//  * passed, the method will just return the literal value.
//  * 
//  * @param {array|string} key
//  * @param {any} data
//  * @returns {Promise}
//  */
// export async function config(...args): Promise<any> {
//     return initialized() && await db.config(...args);
// }

// /**
//  * Remove the cache documents using the specified key(s). This method is an
//  * alias to `removeCache()` to keep the naming consistent, but also
//  * backwards compatible with previous versions.
//  * 
//  * @alias removeCache
//  * @param {array|string} key 
//  * @returns {Promise}
//  */
// export async function purge(...args): Promise<any> {
//     return initialized() && await db.purge(...args);
// }

// /**
//  * Remove the config documents using the specified key(s).
//  * 
//  * @param {array|string} key 
//  * @returns {Promise}
//  */
// export async function removeCache(...args): Promise<any> {
//     return initialized() && await db.removeCache(...args);
// }

// /**
//  * Remove the config documents using the specified key(s).
//  * 
//  * @param {array|string} key 
//  * @returns {Promise}
//  */
// export async function removeConfig(...args): Promise<any> {
//     return initialized() && await db.removeConfig(...args);
// }