<template>
	<div
		class="top-0 left-0 fixed bg-black/40 backdrop-blur-sm w-screen h-screen z-10 flex justify-center items-center">
		<div
			class="bg-slate-50 dark:bg-zinc-900 container box-content py-32 md:p-32 rounded-xl shadow-black/25 shadow-lg">
			<div class="flex flex-col gap-6">
				<div class="w-full flex items-center justify-between gap-4">
					<span
						class="font-inter font-semibold text-slate-800 dark:text-zinc-50 text-2xl"
						>Edit task</span
					>
					<span class="font-inter text-slate-400 text-right leading-4"
						><span class="hidden md:inline">Created at:</span>
						{{ formatDate(task.createdAt) }}</span
					>
				</div>
				<div class="flex flex-col gap-5">
					<div class="w-full flex-col lg:flex-row flex gap-5">
						<div class="flex flex-col w-full gap-5">
							<div
								class="w-full rounded-xl transition-colors duration-150 bg-slate-200/90 dark:bg-zinc-800 dark:focus-within:bg-zinc-700 focus-within:bg-slate-200/90 px-8 py-3 flex items-center"
								:class="
									!titleValid
										? 'outline-red-500/40 dark:outline-red-400/40 outline-1'
										: ' outline-1 outline-transparent'
								">
								<input
									@input="handleChange"
									v-model="title"
									class="placeholder:text-slate-400 text-slate-800 dark:text-zinc-50 font-inter w-full outline-0"
									placeholder="Task title..."
									type="text" />
							</div>
							<div
								class="w-full flex-col gap-1 sm:flex-row rounded-xl transition-colors duration-150 bg-slate-200/90 dark:bg-zinc-800 px-8 py-3 flex sm:items-center sm:justify-between">
								<div
									class="flex items-center gap-3 duration-150 cursor-pointer text-slate-400 hover:text-slate-800 dark:hover:text-zinc-50 select-none"
									:class="
										status === 'todo'
											? 'text-slate-800 dark:text-zinc-50'
											: ''
									"
									@click="chooseStatus('todo')">
									<span
										class="text-current w-5 flex justify-center sm:w-auto sm:bloc">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="12"
											height="16"
											viewBox="0 0 12 16"
											fill="none">
											<path
												d="M3.85714 2.55556H2.42857C2.04969 2.55556 1.68633 2.71944 1.41842 3.01117C1.15051 3.30289 1 3.69855 1 4.11111V13.4444C1 13.857 1.15051 14.2527 1.41842 14.5444C1.68633 14.8361 2.04969 15 2.42857 15H9.57143C9.95031 15 10.3137 14.8361 10.5816 14.5444C10.8495 14.2527 11 13.857 11 13.4444V4.11111C11 3.69855 10.8495 3.30289 10.5816 3.01117C10.3137 2.71944 9.95031 2.55556 9.57143 2.55556H8.14286M3.85714 2.55556C3.85714 2.143 4.00765 1.74733 4.27556 1.45561C4.54347 1.16389 4.90683 1 5.28571 1H6.71429C7.09317 1 7.45653 1.16389 7.72444 1.45561C7.99235 1.74733 8.14286 2.143 8.14286 2.55556M3.85714 2.55556C3.85714 2.96811 4.00765 3.36378 4.27556 3.6555C4.54347 3.94722 4.90683 4.11111 5.28571 4.11111H6.71429C7.09317 4.11111 7.45653 3.94722 7.72444 3.6555C7.99235 3.36378 8.14286 2.96811 8.14286 2.55556M3.85714 8H3.86429M6.71429 8H8.14286M3.85714 11.1111H3.86429M6.71429 11.1111H8.14286"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round" />
										</svg>
									</span>
									<span class="text-current font-inter"
										>To do</span
									>
								</div>
								<div
									class="flex items-center gap-3 duration-150 cursor-pointer select-none"
									:class="
										status === 'inprogress'
											? 'text-amber-600 dark:text-orange-300'
											: 'text-slate-400 hover:text-slate-800 dark:hover:text-zinc-50'
									"
									@click="chooseStatus('inprogress')">
									<span
										class="text-current w-5 flex justify-center sm:w-auto sm:bloc">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="17"
											height="16"
											viewBox="0 0 17 16"
											fill="none">
											<path
												d="M7.1302 15C6.44847 14.8425 5.79374 14.5821 5.18776 14.2272M10.2632 1C11.8204 1.36214 13.2107 2.25189 14.2065 3.52357C15.2023 4.79526 15.7446 6.37353 15.7446 7.99999C15.7446 9.62645 15.2023 11.2047 14.2065 12.4764C13.2107 13.7481 11.8204 14.6378 10.2632 15M2.88422 12.0619C2.45697 11.4298 2.13246 10.7318 1.92318 9.99465M1.74463 6.80368C1.86995 6.04602 2.11119 5.32824 2.44955 4.67027L2.58191 4.42702M4.7076 2.08146C5.44045 1.56777 6.26259 1.20075 7.13017 1M6.34694 8L7.91343 9.59507L11.0464 6.40492"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round" />
										</svg>
									</span>
									<span class="text-current font-inter"
										>In Progress</span
									>
								</div>
								<div
									class="flex items-center gap-3 duration-150 cursor-pointer select-none"
									:class="
										status === 'done'
											? 'text-lime-600 dark:text-lime-400'
											: 'text-slate-400 hover:text-slate-800 dark:hover:text-zinc-50'
									"
									@click="chooseStatus('done')">
									<span
										class="text-current w-5 flex justify-center sm:w-auto sm:block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="17"
											height="12"
											viewBox="0 0 17 12"
											fill="none">
											<path
												d="M1.48926 6L6.15592 11L15.4893 1"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round" />
										</svg>
									</span>
									<span class="text-current font-inter"
										>Done</span
									>
								</div>
							</div>
						</div>
						<div
							class="w-full min-h-36 md:min-h-16 py-3 rounded-xl transition-colors duration-150 bg-slate-200/90 focus-within:bg-slate-200/90 dark:bg-zinc-800 dark:focus-within:bg-zinc-700"
							:class="
								!descriptionValid
									? 'outline-red-500/40 dark:outline-red-400/40 outline-1'
									: 'outline-1 outline-transparent'
							">
							<textarea
								@input="handleChange"
								v-model="description"
								class="px-8 h-full placeholder:text-slate-400 text-slate-800 dark:text-zinc-50 font-inter w-full outline-0 resize-none"
								placeholder="Task description..."
								type="text" />
						</div>
					</div>
					<div class="w-full flex-col md:flex-row flex gap-5">
						<button
							@click="handleEditTask"
							class="w-full rounded-xl transition-colors duration-150 bg-slate-200/90 hover:bg-slate-200/90 px-8 py-3 flex justify-center gap-4 items-center text-slate-800 dark:text-zinc-50 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700">
							<span class="text-current">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="17"
									height="16"
									viewBox="0 0 17 16"
									fill="none">
									<path
										d="M6.16667 8L7.72222 9.55556L10.8333 6.44444M1.5 8C1.5 8.91925 1.68106 9.82951 2.03284 10.6788C2.38463 11.5281 2.90024 12.2997 3.55025 12.9497C4.20026 13.5998 4.97194 14.1154 5.82122 14.4672C6.6705 14.8189 7.58075 15 8.5 15C9.41925 15 10.3295 14.8189 11.1788 14.4672C12.0281 14.1154 12.7997 13.5998 13.4497 12.9497C14.0998 12.2997 14.6154 11.5281 14.9672 10.6788C15.3189 9.82951 15.5 8.91925 15.5 8C15.5 7.08075 15.3189 6.1705 14.9672 5.32122C14.6154 4.47194 14.0998 3.70026 13.4497 3.05025C12.7997 2.40024 12.0281 1.88463 11.1788 1.53284C10.3295 1.18106 9.41925 1 8.5 1C7.58075 1 6.6705 1.18106 5.82122 1.53284C4.97194 1.88463 4.20026 2.40024 3.55025 3.05025C2.90024 3.70026 2.38463 4.47194 2.03284 5.32122C1.68106 6.1705 1.5 7.08075 1.5 8Z"
										stroke="currentColor"
										stroke-width="1.6"
										stroke-linecap="round"
										stroke-linejoin="round" />
								</svg>
							</span>
							<span class="text-current font-medium font-inter"
								>Edit task</span
							>
						</button>
						<button
							@click="handleCancel"
							class="w-full rounded-xl transition-colors duration-150 bg-slate-200/90 hover:bg-slate-200/90 px-8 py-3 flex justify-center gap-4 items-center text-slate-800 dark:text-zinc-50 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700">
							<span class="text-current">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none">
									<path
										d="M13 1L1 13M1 1L13 13"
										stroke="currentColor"
										stroke-width="1.6"
										stroke-linecap="round"
										stroke-linejoin="round" />
								</svg>
							</span>
							<span class="text-current font-medium font-inter"
								>Cancel</span
							>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Task, TaskStatus } from "@/types/task";
	import { ref } from "vue";

	const props = defineProps<{
		task: Task;
		editTask: (task: Task) => void;
		hideEditTaskDialog: () => void;
	}>();

	const status = ref(props.task.status);

	const chooseStatus = (newStatus: TaskStatus) => {
		status.value = newStatus;
	};

	const title = ref(props.task.title);
	const titleValid = ref(true);

	const description = ref(props.task.description);
	const descriptionValid = ref(true);

	const handleChange = () => {
		if (title.value) {
			titleValid.value = true;
		}
		if (description.value) {
			descriptionValid.value = true;
		}
	};

	const handleEditTask = () => {
		if (!title.value) {
			titleValid.value = false;
			return;
		}
		if (!description.value) {
			descriptionValid.value = false;
			return;
		}
		props.editTask({
			id: props.task.id,
			title: title.value,
			description: description.value,
			status: status.value,
			createdAt: props.task.createdAt,
		});
		title.value = "";
		description.value = "";
		props.hideEditTaskDialog();
	};
	const handleCancel = () => {
		title.value = "";
		description.value = "";
		props.hideEditTaskDialog();
	};
	const formatDate = (date: string) => {
		return new Date(date).toLocaleString();
	};
</script>
