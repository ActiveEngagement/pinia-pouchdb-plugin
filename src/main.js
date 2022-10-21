import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { usePouchPlugin } from './PouchPlugin';

const pinia = createPinia().use(
    usePouchPlugin({
        database: 'pinia-demo'
    })
);

createApp(App)
    .use(pinia)
    .mount('#app');