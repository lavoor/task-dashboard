<template>
    <div class="relative" ref="menuRef">
        <div @click="expandMenu" class="flex items-center gap-3 cursor-pointer text-stone-500 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-50">
            <span class="text-current transition-all duration-150" :class="expanded ? 'rotate-180' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                    <path d="M1 1.5L7 7.5L13 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span class="transition-colors duration-150 text-current font-inter font-medium text-sm sm:text-base select-none">{{ selected.label }}</span>
        </div>
        <Transition>
            <div v-if="expanded" class="absolute z-10 mt-2 w-max flex flex-col rounded-xl rounded-tl-none bg-stone-50 dark:bg-stone-900 p-4
            shadow-black/25 shadow-lg outline-1 outline-stone-800/10 dark:outline-stone-50/10"
            >
                <span v-for="sorting in sortings" :key="sorting.value"
                class="font-medium font-inter cursor-pointer duration-150 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-50"
                @click="selectOption(sorting)"
                >{{ sorting.label }}</span>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    const props = defineProps<{
        sortTasks: (sorting: string) => void;
    }>();

    type Sorting = {
        label: string;
        value: string;
    };

    const sortings = [
        {
            label: "Od najnowszych",
            value: "newest"
        },
        {
            label: "Od najstarszych",
            value: "oldest"
        },
    ];

    const expanded = ref<boolean>(false);
    const selected = ref<Sorting>(sortings[0]);

    const menuRef = ref<HTMLElement | null>(null);

    const expandMenu = () => {
        expanded.value = !expanded.value;
    }

    const selectOption = (sorting: Sorting) => {
        selected.value = sorting;
        props.sortTasks(sorting.value);
        expanded.value = false;
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