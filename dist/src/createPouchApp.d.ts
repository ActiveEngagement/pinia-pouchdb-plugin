import type { Application, Component } from "vue";
import type { Pinia, StoreDefinition } from "pinia";
interface PouchLoaderParameters {
    pinia: Pinia;
    database: any;
    stores?: StoreDefinition[];
    loaded?: Function;
}
interface PouchAppParameters extends PouchLoaderParameters {
    loaded?: (app: Application) => void;
    beforeMount?: (app: Application) => void;
    mounted?: (app: Application) => void;
}
export declare function createPouchLoader(App: Component, options?: PouchLoaderParameters, component?: Record<string, any>): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export declare function createPouchApp(App: Component, params?: PouchAppParameters): import("vue").App<Element>;
export {};
