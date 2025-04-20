<template>
    <div class="p-4  bg-white rounded-2xl shadow flex flex-col items-start gap-5">
        <img :src="iconPath" :alt="title" class="w-12 h-12 object-contain" />
        <div>
            <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
            <p class="text-gray-600 text-sm">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    title: String,
    description: String,
    icon: String,
})

const iconPath = computed(() =>
    new URL(`../assets/icons/${props.icon}.png`, import.meta.url).href
)
</script>