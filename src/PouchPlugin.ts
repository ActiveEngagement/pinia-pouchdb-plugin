import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import { StateTree } from 'pinia';
import { watch } from 'vue';
import { init } from './Storage';

interface PouchePluginOptions {
    database?: string,
    wait?: number
}

export const usePouchPlugin = (options: PouchePluginOptions) => {
    // Initialize the database.
    const db = init(options.database || 'pinia-pouchdb-plugin');

    // The db state loader.
    async function load(state: StateTree) {
        // Loop through the app.pinia.state keys and get the saved values.
        for(const [key, store] of Object.entries(state.value)) {
            for(const prop of Object.keys(store)) {            
                const value = await db.config(`${key}.${prop}`);
    
                if(value !== undefined) {
                    store[prop] = JSON.parse(JSON.stringify(value));
                }
            }
        }
    }

    // Define the Pinia plugin with an async function so we can await promises.
    return (app) => {
        // Define the previous state by converting it to a plain object.
        // This allows us to deef diff the objects later and only save the
        // changes that we need, instead of saving the entire state every time.
        let prevState = JSON.parse(JSON.stringify(app.pinia.state)) || {};

        // Create the watcher using the debounce function.
        watch(app.pinia.state, debounce(async() => {
            for(const [key, store] of Object.entries<[string,any]>(app.pinia.state.value)) {
                const parsed = JSON.parse(JSON.stringify(store));

                // Calculate the differences between the prev/current states
                const difference = diff(prevState[key] || {}, parsed);

                // Loop through the differences and save the key/value in the db.
                for(let prop of Object.keys(difference)) {
                    // Set the config key/value pair.
                    await db.config(`${key}.${prop}`, store[prop]);
                }

                // Set the previous back to a plain object so we can compare again
                // the next time the debouncer callback is fired.
                prevState[key] = parsed;
            }
        }, options.wait || 100), {
            // Use deep so we can track changes within nested objects/arrays.
            deep: true
        });

        // Provide some functions to load the PouchDB at runtime.
        app.provide('PouchDB', { load, prevState });
    };
}