<template>
	<div
		class="relative"
		ref="menuRef">
		<div
			@click="expandMenu"
			class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-300">
			<span
				class="text-current transition-all duration-150"
				:class="expanded ? 'rotate-180' : ''">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="9"
					viewBox="0 0 14 9"
					fill="none">
					<path
						d="M1 1.5L7 7.5L13 1.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</span>
			<span
				class="transition-colors duration-150 text-current font-inter font-medium text-sm sm:text-base select-none"
				>Filters</span
			>
			<Transition>
				<span
					v-if="filters.filter((filter) => filter.value).length > 0"
					class="w-4 h-4 text-center font-inter flex items-center justify-center rounded-full bg-slate-500 text-slate-50 dark:bg-zinc-400 dark:text-zinc-800 text-[0.65rem] font-bold"
					>{{ filters.filter((filter) => filter.value).length }}</span
				>
			</Transition>
		</div>
		<Transition>
			<div
				v-if="expanded"
				class="absolute z-10 mt-2 w-max flex flex-col rounded-xl rounded-tl-none bg-slate-50 dark:bg-zinc-900 p-4 shadow-black/25 shadow-lg outline-1 outline-slate-800/10 dark:outline-slate-50/10">
				<span
					v-for="filter in filters"
					:key="filter.label"
					class="font-medium font-inter cursor-pointer duration-150 select-none"
					:class="
						filter.value
							? 'text-slate-800 dark:text-zinc-50'
							: 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-50'
					"
					@click="selectOption(filter)"
					>{{ filter.label }}</span
				>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { TaskStatus } from "@/types/task";
	import { onMounted, onUnmounted, ref } from "vue";
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
			label: "To do",
			id: "todo",
			value: false,
		},
		{
			label: "In progress",
			id: "inprogress",
			value: false,
		},
		{
			label: "Done",
			id: "done",
			value: false,
		},
	]);

	const expanded = ref(false);
	const menuRef = ref<HTMLElement | null>(null);

	const expandMenu = () => {
		expanded.value = !expanded.value;
	};

	const selectOption = (filter: Filter) => {
		filter.value = !filter.value;
		props.addFilters(filter.id);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (!expanded.value) {
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
