import { createPinia } from 'pinia';
import App from './App.vue'
import { usePouchPlugin } from './PouchPlugin';
import { createPouchApp } from './createPouchApp';
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
    .use(pinia)
    .mount('#app');