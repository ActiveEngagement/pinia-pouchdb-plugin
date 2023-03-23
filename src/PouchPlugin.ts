import { diff } from 'deep-object-diff';
import type { Pinia, PiniaPluginContext, StateTree } from 'pinia';

interface PouchePluginOptions {
    database: PouchDB.Database,
    wait?: number
}

// The db state loader.
export async function load(database: PouchDB.Database, pinia: Pinia) {
    const docs = (await database.allDocs({
        include_docs: true,
        attachments: true
    })).rows.reduce((carry, row) => {
        return Object.assign(carry, {
            [row.id]: row.doc
        });
    }, {});

    // Loop through the context.pinia.state keys and get the saved values.
    for(const [key, store] of Object.entries(pinia.state.value)) {
        for(const prop of Object.keys(store)) {    
            const i = `${key}.${prop}`;
            
            if(docs[i] === undefined) {
                continue;
            }

            store[prop] = docs[i].$value === undefined
                ? undefined
                : JSON.parse(JSON.stringify(docs[i].$value));
        }
    }
}

export const usePouchPlugin = (options: PouchePluginOptions) => {
    return (context: PiniaPluginContext) => {
        // Define the previous state by converting it to a plain object.
        // This allows us to deef diff the objects later and only save the
        // changes that we need, instead of saving the entire state every time.
        let prevState = JSON.parse(JSON.stringify(context.store.$state)) || {};

        // Asynchronsouly subscribe to the store and listen for changes.
        // When changes to the store are made, the callback will fire and we'll
        // diff the state from the last known state and only update those keys.
        context.store.$subscribe(async(mutation, state: StateTree) => {
            // Parse the state into a standard object.
            const parsed = JSON.parse(JSON.stringify(state));

            // Calculate the differences between the prev/current states
            const difference = diff(prevState || {}, parsed);

            // Loop through the differences and save the key/value in the db.
            for(let prop of Object.keys(difference)) {
                // Set the config key/value pair.
                // @ts-ignore
                await options.database.config(
                    `${context.store.$id}.${prop}`, context.store[prop]
                );
            }

            // Update the previous state object.
            prevState = parsed;
        });
    };
};