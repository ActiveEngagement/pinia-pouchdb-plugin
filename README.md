# Pinia PouchDB Plugin

This is a plugin for [Pinia](https://pinia.vuejs.org) that uses PouchDB to persist data on the browser using PouchDB.

## Installation

    npm i pinia-pouchdb-plugin

## Basic Usage

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { init, usePouchPlugin } from 'pinia-pouchdb-plugin';

const pinia = createPinia().use(
    usePouchPlugin({
        database: init('database-name')
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

Pinia stores are defined by specificy a key and a state of key/value pairs. Pinia stores are saved in PouchDB using the following format: `storeName.propName`. So if a store was defined with a key of `main` and the state had `first` and `last` properties, `main.first` and `main.last` would the two valid storage paths. You only need these paths should you want to interact with the PouchDB database.

## PouchDB Helpers

Not only does this repo provide a simple plugin for interacting with Pinia stores that just magically works, it also provide helpers to get and set that data directly from the PouchDB.

This plugin provides two types of stores: config and cache. Both stores are key value pairs, however the cache will expire after a specific period of time and config persist until they are destroyed.

*All functions are asynchronous.*

### Config

Config's are key/value pairs. This a helper method to return the config data from the stored doc.

```js
import { config, removeConfig } from 'pinia-pouchdb-plugin';

// Set a config "key" with a literal value
config('main.key', true);

// Set a config "key" using a promise.
cache('main.key', () => Promise.resolve(true), 10).then(data => {
    console.log(data) // true
});

// Get the config "key" value.
config('main.key').then(docs => {
    console.log(docs) // true
});

// Remove the "key" from the database
removeConfig('main.key')
```

### Cache

Cache's extend the config methods, but track when the values should be purged.
Config values are saved forever, cache values can expire. 

```js
import { cache, purge } from 'pinia-pouchdb-plugin';

// Cache "key" for 10 seconds using a literal value
cache('main.key', true, 10).then(data => {
    console.log(data) // true
});

// Cache "key" for 10 seconds using a promise.
cache('main.key', () => Promise.resolve(true), 10).then(data => {
    console.log(data) // true
});

// Purge "key" from the cache.
purge('main.key').then(docs => {
    console.log(docs) // array of docs that were removed.
});
```
