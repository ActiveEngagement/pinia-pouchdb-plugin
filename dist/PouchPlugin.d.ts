import type { Pinia, PiniaPluginContext } from 'pinia';
interface PouchePluginOptions {
    database: PouchDB.Database;
    wait?: number;
}
export declare function load(database: PouchDB.Database, pinia: Pinia): Promise<void>;
export declare const usePouchPlugin: (options: PouchePluginOptions) => (context: PiniaPluginContext) => void;
export {};
