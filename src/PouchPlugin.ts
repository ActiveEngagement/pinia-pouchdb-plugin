import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import { Pinia } from 'pinia';
import { h, Suspense, watch } from 'vue';
import App from './App.vue';
import { init } from './Storage';

interface PouchePluginOptions {
    database: PouchDB.Database,
    wait?: number
}

// The db state loader.
export async function load(database: PouchDB.Database, pinia: Pinia) {
    // Loop through the context.pinia.state keys and get the saved values.
    for(const [key, store] of Object.entries(pinia.state.value)) {
        for(const prop of Object.keys(store)) {            
            const value = await database.config(`${key}.${prop}`);

            if(value !== undefined) {
                store[prop] = JSON.parse(JSON.stringify(value));
            }
        }
    }
}

export const usePouchPlugin = (options: PouchePluginOptions) => {
    // Define the Pinia plugin with an async function so we can await promises.
    return (context) => {
        // Define the previous state by converting it to a plain object.
        // This allows us to deef diff the objects later and only save the
        // changes that we need, instead of saving the entire state every time.
        let prevState = JSON.parse(JSON.stringify(context.pinia.state)) || {};

        // Create the watcher using the debounce function.
        watch(context.pinia.state, debounce(async() => {
            for(const [key, store] of Object.entries<[string,any]>(context.pinia.state.value)) {
                const parsed = JSON.parse(JSON.stringify(store));

                // Calculate the differences between the prev/current states
                const difference = diff(prevState[key] || {}, parsed);

                // Loop through the differences and save the key/value in the db.
                for(let prop of Object.keys(difference)) {
                    // Set the config key/value pair.
                    await options.database.config(`${key}.${prop}`, store[prop]);
                }

                // Set the previous back to a plain object so we can compare again
                // the next time the debouncer callback is fired.
                prevState[key] = parsed;
            }
        }, options.wait || 100), {
            // Use deep so we can track changes within nested objects/arrays.
            deep: true
        });
    };
}