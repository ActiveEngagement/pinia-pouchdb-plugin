import type { App, Component } from "vue";
import type { Pinia, StoreDefinition } from "pinia";
interface PouchLoaderParameters {
    pinia: Pinia;
    database: any;
    stores?: StoreDefinition[];
    loaded?: Function;
}
interface PouchAppParameters extends PouchLoaderParameters {
    loaded?: (app: App) => void;
    beforeMount?: (app: App) => void;
    mounted?: (app: App) => void;
}
export declare function createPouchLoader(App: Component, options?: PouchLoaderParameters, component?: Record<string, any>): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export declare function createPouchApp(App: Component, params?: PouchAppParameters): App<Element>;
export {};
