import { createApp, defineComponent, h, Suspense } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { createPouchApp, usePouchPlugin, load } from './PouchPlugin';
import { init } from './Storage';

const database = init('pinia-demo');

const pinia = createPinia().use(
    usePouchPlugin({
        database
    })
);

createApp(App)
    .use(pinia)
    .mount('#app');