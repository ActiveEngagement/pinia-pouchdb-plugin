/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import { Pinia } from 'pinia';
interface PouchePluginOptions {
    component?: string;
    database?: string;
    wait?: number;
}
export declare function load(db: PouchDB.Database, pinia: Pinia): Promise<void>;
export declare const usePouchPlugin: (options: PouchePluginOptions) => (context: any) => void;
export {};
