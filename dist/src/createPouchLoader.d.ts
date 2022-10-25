import type { Component } from "vue";
import type { Pinia, Store } from "pinia";
interface PouchAppParameters {
    pinia: Pinia;
    database: any;
}
export declare function createPouchLoader(App: Component, { pinia, database }: PouchAppParameters, stores?: () => Store[]): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export declare function createPouchApp(App: Component, params: PouchAppParameters, stores?: () => Store[]): import("vue").App<Element>;
export {};
