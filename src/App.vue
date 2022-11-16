<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from './store';

const { first, last } = storeToRefs(useMainStore())
</script>

<template>
    <input type="text" v-model="first" placeholder="First Name" />
    <input type="text" v-model="last" placeholder="Last Name" />
</template>