import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('main', () => {
    const first = ref<string>();
    const last = ref<string>();

    return { first, last };
});

export const useSettingsStore = defineStore('settings', () => {
    const firstTimeUser = ref<string>();

    return { firstTimeUser };
});