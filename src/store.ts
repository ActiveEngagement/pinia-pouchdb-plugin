import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const first = ref<string>();
    const last = ref<string>();

    return { first, last };
});