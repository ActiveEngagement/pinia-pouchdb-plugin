import { createApp, defineComponent, h, Suspense } from "vue";
import type { App, Component } from "vue";
import type { Pinia, StoreDefinition } from "pinia";
import { load } from "./PouchPlugin";

interface PouchLoaderParameters {
    pinia: Pinia,
    database: any,
    stores?: StoreDefinition[],
    loaded?: Function
}

interface PouchAppParameters extends PouchLoaderParameters {
    loaded?: (app: App) => void,
    beforeMount?: (app: App) => void,
    mounted?: (app: App) => void,
}

export function createPouchLoader(App: Component, options?: PouchLoaderParameters, component?: Record<string,any>) {
    const { pinia, database, stores, loaded } = options || {};

    const PouchLoader = defineComponent({
        render() {
            return h(Suspense, h(Object.assign({
                setup: async () => {
                    if(stores) {
                        for(const store of stores) {
                            store();
                        }
                    }

                    await load(database, pinia);

                    loaded && loaded();
                },
                render() {
                    return h(App);
                }
            }, component)));
        }
    });

    return h(PouchLoader, {}, { default: () => App });
}

export function createPouchApp(App: Component, params?: PouchAppParameters) {
    const app = createApp(createPouchLoader(App, {
        database: params.database,
        pinia: params.pinia,
        stores: params.stores,
        loaded: params.loaded && function() {
            params.loaded(app);
        }
    }, {
        beforeMount: params.beforeMount && function() {
            params.beforeMount(app);
        },
        mounted: params.mounted && function() {
            params.mounted(app);
        }
    }));

    return app;
}