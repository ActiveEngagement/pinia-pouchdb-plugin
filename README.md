# Pinia PouchDB Plugin

This is a plugin for [Pinia](https://pinia.vuejs.org) that uses PouchDB to persist data on the browser using PouchDB.

#### Installation

    npm i pinia-pouchdb-plugin

## Basic Usage

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { usePouchePlugin } from './PouchPlugin';

const pinia = createPinia().use(
    usePouchePlugin({
        database: 'pinia-demo'
    })
);

createApp(App)
    .use(pinia)
    .mount('#app');
```

```js
// store.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const first = ref<string>();
    const last = ref<string>();

    return { first, last };
});
```

```html
<!-- App.vue -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useStore } from './store';

const { first, last } = storeToRefs(useStore())
</script>

<template>
  <input type="text" v-model="first" placeholder="First Name" />
  <input type="text" v-model="last" placeholder="Last Name" />
</template>
```

## Storage Paths

Pinia stores are defined by specificy a key and a state of key/value pairs. Pinia stores are saved in PouchDB using the following format: `storeName.propName`. So if had a store had a key of `main` with a `first` and `last`, `main.first` and `main.last` would the two valid storage paths. You only need these paths should you want to use the PouchDB helpers.

## PouchDB Helpers

Not only does this repo provide a simple plugin for interacting with Pinia stores and it just magically work, we also provide helpers to get that data directly from the PouchDB, should you need to.

This plugin provides two types of stores: config and cache. Both stores are key value pairs, however the cache will expire after a specific period of time and config persist until they are destroyed.

### Config

Config's are key/value pairs. This a helper method to return the config data from the stored doc.

```js
import { config } from 'pinia-pouchdb-plugin';

config('main.first', true);

config('main.first').then(docs => {
    console.log(docs) // true
});
```

### Cache

Cache's extend the config methods, but track when the values should be purged.
Config values are saved forever, cache values can expire.

```js
import { cache } from 'pinia-pouchdb-plugin';

// Cache "key" for 10 seconds.
cache('key', () => Promise.resolve(true), 10).then(data => {
    console.log(data) // true
});

purge('key').then(docs => {
    console.log(docs) // array of docs that were removed.
});
```