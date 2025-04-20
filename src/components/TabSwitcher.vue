<template>
    <div class="min-h-[calc(100vh-10vh)] py-8 sm:py-0 flex items-center justify-center px-4">
        <section class="w-full max-w-4xl flex flex-col gap-12">
            <h1 class="md:text-5xl text-3xl font-bold text-center">آفرهای اسپانسرینگ</h1>

            <!-- تب‌ها -->
            <div class="flex justify-center">
                <div class="flex rounded-full overflow-hidden p-1 bg-white w-2/3 sm:w-2/6">
                    <button class="w-1/2 py-4 text-center cursor-pointer rounded-full"
                        :class="selectedTab === 'direct' ? activeClass : inactiveClass" @click="selectedTab = 'direct'">
                        مستقیم
                    </button>
                    <button class="w-1/2 py-4 text-center cursor-pointer rounded-full"
                        :class="selectedTab === 'indirect' ? activeClass : inactiveClass"
                        @click="selectedTab = 'indirect'">
                        غیر مستقیم
                    </button>
                </div>
            </div>

            <!-- محتوای تب‌ها -->
            <div v-if="selectedTab === 'direct'" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Card v-for="card in cardStore.cards" :key="card.id" :title="card.title" :description="card.description"
                    :icon="card.icon" />
            </div>

            <draggable v-else v-model="localCards" item-key="id" class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                :animation="200" ghost-class="drag-ghost" chosen-class="drag-chosen" @end="onDragEnd">
                <template #item="{ element }">
                    <Card :title="element.title" :description="element.description" :icon="element.icon" class="cursor-pointer"/>
                </template>
            </draggable>
        </section>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useCardStore } from '@/stores/cardStore'
import draggable from 'vuedraggable'
import Card from './Card.vue'

const selectedTab = ref('direct')
const cardStore = useCardStore()
const localCards = ref([...cardStore.cards]) // کپی برای درگ

const activeClass = 'bg-[#00a693] text-white'
const inactiveClass = 'bg-white text-gray-700 hover:bg-gray-100'

// همگام‌سازی localCards با استور هنگام ورود به تب غیر مستقیم
watch(selectedTab, (val) => {
    if (val === 'indirect') {
        localCards.value = [...cardStore.cards]
    }
})

// وقتی درگ تموم شد، ترتیب جدید رو در استور ذخیره کن
function onDragEnd() {
    cardStore.updateOrder(localCards.value)
}
</script>

<style scoped>
.drag-ghost {
    opacity: 0.4;
    transform: scale(0.95);
    transition: all 0.2s ease;
}

.drag-chosen {
    z-index: 50;
    transform: scale(1.03);
    transition: all 0.2s ease;
}
</style>