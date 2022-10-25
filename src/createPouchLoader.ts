import { createApp, defineComponent, h, Suspense } from "vue";
import type { Component } from "vue";
import type { Pinia, Store } from "pinia";
import { load } from "./PouchPlugin";

interface PouchAppParameters {
    pinia: Pinia,
    database: any
}

export function createPouchLoader(App: Component, { pinia, database }: PouchAppParameters, stores?: () => Store[]) {
    const PouchLoader = defineComponent({
        render() {
            return h(Suspense, h({
                async setup() {
                    if(stores) {
                        await stores();
                    }

                    await load(database, pinia);
                },
                render() {
                    return h(App);
                }
            }));
        }
    });

    return h(PouchLoader, {}, {
        default: () => App
    })
}

export function createPouchApp(App: Component, params: PouchAppParameters, stores?: () => Store[]) {
    return createApp(createPouchLoader(App, params, stores))
}