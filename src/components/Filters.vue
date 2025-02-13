<template>
    <div class="relative" ref="menuRef">
        <div @click="expandMenu" class="flex items-center gap-3 cursor-pointer text-stone-500 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300">
            <span class="text-current transition-all duration-150" :class="expanded ? 'rotate-180' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                    <path d="M1 1.5L7 7.5L13 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span class="transition-colors duration-150 text-current font-inter font-medium text-sm sm:text-base select-none">Filtry</span>
            <Transition>
                <span v-if="filters.filter(filter => filter.value).length > 0" class="w-4 h-4 text-center font-inter flex items-center justify-center rounded-full bg-stone-500 text-stone-50 dark:bg-stone-400 dark:text-stone-800 text-[0.65rem] font-bold">{{ filters.filter(filter => filter.value).length }}</span>
            </Transition>
        </div>
        <Transition>
            <div v-if="expanded" class="absolute z-10 mt-2 w-max flex flex-col rounded-xl rounded-tl-none bg-stone-50 dark:bg-stone-900 p-4
            shadow-black/25 shadow-lg outline-1 outline-stone-800/10 dark:outline-stone-50/10"
            >
                <span v-for="filter in filters" :key="filter.label"
                class="font-medium font-inter cursor-pointer duration-150 select-none"
                :class="filter.value ? 'text-stone-800 dark:text-stone-50' : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-50'"
                @click="selectOption(filter)"
                >{{ filter.label }}</span>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { TaskStatus } from '@/types/task';
    import { onMounted, onUnmounted, ref } from 'vue';
    const props = defineProps<{
        addFilters: (filterId: string) => void;
    }>();

    type Filter = {
        label: string;
        id: TaskStatus;
        value: boolean;
    };

    const filters = ref<Filter[]>([
        {
            label: "Do zrobienia",
            id: "todo",
            value: false
        },
        {
            label: "W trakcie",
            id: "inprogress",
            value: false
        },
        {
            label: "Zrobione",
            id: "done",
            value: false
        },
    ]);

    const expanded = ref(false);
    const menuRef = ref<HTMLElement | null>(null);

    const expandMenu = () => {
        expanded.value = !expanded.value;
    }

    const selectOption = (filter: Filter) => {
        filter.value = !filter.value;
        props.addFilters(filter.id);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if(!expanded.value){
            return;
        }
        if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
            expanded.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
    });
</script>