<template>
    <div class="flex rounded-xl bg-stone-150 dark:bg-stone-800 dark:focus-within:bg-stone-750 h-11 px-8 items-center gap-8 transition-colors duration-150 focus-within:bg-stone-200">
        <span class="text-stone-500 dark:text-stone-400 min-w-max">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        <input v-model="inputValue" @input="handleSearch" class="w-full outline-none border-none font-inter text-base placeholder:text-stone-500 text-stone-800 dark:placeholder:text-stone-400 dark:text-stone-50" placeholder="Tytuł lub opis zadania..." type="text"/>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const props = defineProps<{
        searchTasks: (search: string) => void;
    }>();
    const inputValue = ref('');
    const handleSearch = () => {
        console.log(inputValue.value);
        props.searchTasks(inputValue.value);
    };
</script>