/// <reference types="pouchdb-adapter-websql" />
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
