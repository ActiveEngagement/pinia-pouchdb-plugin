/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import { Pinia } from 'pinia';
interface PouchePluginOptions {
    database: PouchDB.Database;
    wait?: number;
}
export declare function load(database: PouchDB.Database, pinia: Pinia): Promise<void>;
export declare const usePouchPlugin: (options: PouchePluginOptions) => (context: any) => void;
export {};
