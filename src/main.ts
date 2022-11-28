import { createPinia } from 'pinia';
import App from './App.vue';
import { createPouchApp } from './createPouchApp';
import { usePouchPlugin } from './PouchPlugin';
import { init } from './Storage';
import { useMainStore, useSettingsStore } from './store';

const database = init('pinia-demo');

const pinia = createPinia().use(
    usePouchPlugin({
        database
    })
);

createPouchApp(App, {
    pinia,
    database,
    stores: [
        useMainStore,
        useSettingsStore
    ]
})
    .use(app => {
        app.mixin({
            mounted() {
                console.log('mounted');
            }
        });
    })
    .use(pinia)
    .mount('#app');