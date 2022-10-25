import { createPinia } from 'pinia';
import App from './App.vue'
import { usePouchPlugin } from './PouchPlugin';
import { createPouchApp } from './createPouchLoader';
import { init } from './Storage';
import { useStore } from './store';

const database = init('pinia-demo');

const pinia = createPinia().use(
    usePouchPlugin({
        database
    })
);

createPouchApp(App, {
    pinia,
    database
}, async () => [
    useStore()
])
    .use(pinia)
    .mount('#app');