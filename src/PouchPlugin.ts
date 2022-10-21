import { watch } from 'vue'
import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import { init } from './Storage';

interface PouchePluginOptions {
    database: string,
    wait: number,
    initialized: (context:any) => void
}

export const usePouchPlugin = (options: PouchePluginOptions) => {
    if(!options.database) {
        throw new Error('The database name must be defined.');
    }

    // Initialize the database.
    const db = init(options.database);

    // Define the Pinia plugin with an async function so we can await promises.
    return async(context) => {
        // Loop through the context.pinia.state keys and get the saved values.
        for(const [key, store] of Object.entries(context.pinia.state.value)) {
            for(const prop of Object.keys(store)) {            
                const value = await db.config(`${key}.${prop}`);

                if(value !== undefined) {
                    store[prop] = JSON.parse(JSON.stringify(value));
                }
            }
        }

        // Define the previous state by converting it to a plain object.
        // This allows us to deef diff the objects later and only save the
        // changes that we need, instead of saving the entire state every time.
        let prevState = JSON.parse(JSON.stringify(context.pinia.state)) || {};

        // Create the watcher using the debounce function.
        watch(context.pinia.state, debounce(async(state) => {
            for(const [key, store] of Object.entries<[string,any]>(context.pinia.state.value)) {
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

        if(typeof options.initialized === 'function') {
            options.initialized(context);
        }
    };
}