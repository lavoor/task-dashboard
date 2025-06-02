<template>
	<div
		class="bg-slate-50 dark:bg-zinc-900 min-h-screen min-w-screen duration-150"
		:class="darkMode ? 'dark' : ''">
		<div class="container py-16 flex flex-col gap-6">
			<div class="w-full flex justify-between items-center">
				<h1
					class="font-inter text-2xl text-slate-800 dark:text-zinc-50 font-semibold">
					Tasks
				</h1>
				<span
					class="text-slate-400 cursor-pointer group hover:animate-rotate-hover"
					@click="toggleDarkMode">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="17"
						viewBox="0 0 16 17"
						fill="none"
						class="fill-transparent group-hover:fill-slate-400 dark:fill-slate-400 dark:hover:fill-transparent transition-colors duration-150">
						<path
							d="M13.4443 7.72844H15M14.2221 6.95066V8.50622M7.99917 1.50622C8.10185 1.50622 8.20375 1.50622 8.30487 1.50622C7.30557 2.43466 6.66324 3.68388 6.48954 5.03673C6.31584 6.38958 6.62175 7.76051 7.3541 8.91123C8.08645 10.062 9.19893 10.9197 10.4982 11.3354C11.7974 11.751 13.2012 11.6983 14.4656 11.1864C13.9792 12.3566 13.1843 13.3728 12.1656 14.1266C11.1469 14.8805 9.94264 15.3437 8.68129 15.4669C7.41994 15.59 6.14881 15.3685 5.00349 14.826C3.85817 14.2834 2.88163 13.4402 2.17802 12.3862C1.47442 11.3323 1.07015 10.1071 1.00833 8.84142C0.94652 7.57573 1.22948 6.31701 1.82703 5.19951C2.42459 4.08201 3.31432 3.14766 4.40132 2.49613C5.48832 1.84459 6.73182 1.50031 7.99917 1.5V1.50622ZM11.8885 2.284C11.8885 2.69656 12.0524 3.09222 12.3442 3.38394C12.6359 3.67566 13.0316 3.83955 13.4443 3.83955C13.0316 3.83955 12.6359 4.00344 12.3442 4.29516C12.0524 4.58689 11.8885 4.98255 11.8885 5.39511C11.8885 4.98255 11.7246 4.58689 11.4328 4.29516C11.1411 4.00344 10.7454 3.83955 10.3328 3.83955C10.7454 3.83955 11.1411 3.67566 11.4328 3.38394C11.7246 3.09222 11.8885 2.69656 11.8885 2.284Z"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</span>
			</div>
			<SearchBar :searchTasks="searchTasks" />
			<div class="w-full flex items-center justify-between">
				<div class="flex items-center gap-4 sm:gap-9">
					<Sorting :sortTasks="sortTasks" />
					<Filters :addFilters="addFilters" />
				</div>
				<div class="flex items-center gap-3">
					<OptionList
						:selected="tasksStyle === 'list'"
						:chooseOption="chooseTaskStyle" />
					<OptionCards
						:selected="tasksStyle === 'cards'"
						:chooseOption="chooseTaskStyle" />
				</div>
			</div>
			<div class="flex flex-col w-full">
				<div class="w-full flex flex-col">
					<AddButton @click="showAddTaskDialog" />
				</div>
				<div v-if="tasksStyle === 'cards' && visibleTasks.length > 0">
					<TransitionGroup
						@beforeLeave="handleBeforeLeave"
						name="taskCard"
						tag="div"
						class="w-full flex flex-col lg:grid lg:grid-cols-2 gap-5"
						appear>
						<TaskCardItem
							v-for="task in visibleTasks"
							:key="task.id"
							:taskDone="taskDone"
							:showEditTaskDialog="showEditTaskDialog"
							:deleteTask="deleteTask"
							:task="task" />
					</TransitionGroup>
				</div>
				<div v-else-if="visibleTasks.length > 0">
					<TransitionGroup
						name="taskList"
						tag="div"
						appear>
						<TaskListItem
							v-for="task in visibleTasks"
							:key="task.id"
							:taskDone="taskDone"
							:showEditTaskDialog="showEditTaskDialog"
							:deleteTask="deleteTask"
							:task="task" />
					</TransitionGroup>
				</div>
				<div
					v-else
					class="w-full">
					<span
						class="font-inter font-medium text-slate-500 dark:text-zinc-400"
						>No tasks found...</span
					>
				</div>
			</div>
		</div>
		<Transition>
			<AddTask
				v-if="addTaskDialog"
				:createTask="createTask"
				:hideAddTaskDialog="hideAddTaskDialog" />
		</Transition>
		<Transition>
			<EditTask
				v-if="editTaskDialog"
				:task="currentTaskEditing"
				:editTask="editTask"
				:hideEditTaskDialog="hideEditTaskDialog" />
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeMount, onMounted, ref } from "vue";

	import SearchBar from "./components/SearchBar.vue";
	import Sorting from "./components/Sorting.vue";
	import Filters from "./components/Filters.vue";
	import AddButton from "./components/AddButton.vue";
	import TaskListItem from "./components/TaskListItem.vue";
	import TaskCardItem from "./components/TaskCardItem.vue";
	import OptionList from "./components/OptionList.vue";
	import OptionCards from "./components/OptionCards.vue";
	import type { Task, TaskStatus } from "./types/task";
	import AddTask from "./components/AddTask.vue";
	import EditTask from "./components/EditTask.vue";
	import { isTaskArray } from "./utils/checkTaskArray";

	const tasks = ref<Task[]>([]);

	const darkMode = ref(false);
	const toggleDarkMode = () => {
		darkMode.value = !darkMode.value;
		localStorage.setItem("userDarkMode", JSON.stringify(darkMode.value));
	};
	const getUserDarkMode = () => {
		const userDarkMode = localStorage.getItem("userDarkMode");
		if (userDarkMode) {
			darkMode.value = JSON.parse(userDarkMode);
		}
	};

	const handleBeforeLeave = (element: Element) => {
		const el = element as HTMLElement;
		const { marginLeft, marginTop, width, height } =
			window.getComputedStyle(el);

		element.setAttribute(
			"style",
			`
        left: ${el.offsetLeft - parseInt(marginLeft)}px;
        top: ${el.offsetTop - parseInt(marginTop)}px;
        width: ${width};
        height: ${height};
    `
		);
	};

	const visibleTasks = ref<Task[]>([]);
	const addTaskDialog = ref(false);
	const editTaskDialog = ref(false);
	const showAddTaskDialog = () => {
		addTaskDialog.value = true;
	};
	const hideAddTaskDialog = () => {
		addTaskDialog.value = false;
	};
	const showEditTaskDialog = (task: Task) => {
		editTaskDialog.value = true;
		currentTaskEditing.value = task;
	};
	const hideEditTaskDialog = () => {
		editTaskDialog.value = false;
		currentTaskEditing.value = {
			id: "",
			title: "",
			description: "",
			status: "todo",
			createdAt: "",
		};
	};

	const currentTaskEditing = ref<Task>({
		id: "",
		title: "",
		description: "",
		status: "todo",
		createdAt: "",
	});

	const tasksStyle = ref("list");
	const chooseTaskStyle = (option: string) => {
		tasksStyle.value = option;
		localStorage.setItem("userTasksStyle", option);
	};
	const getUserTaskStyle = () => {
		const taskStyle = localStorage.getItem("userTasksStyle");
		if (taskStyle) {
			tasksStyle.value = taskStyle;
		}
	};

	const filters = ref<string[]>([]);
	const sorting = ref("newest");
	const searchValue = ref("");
	const debounceTime = 500;
	const debounceTimeout = ref<NodeJS.Timeout | null>(null);

	const searchTasks = (value: string) => {
		searchValue.value = value;
		if (debounceTimeout.value) {
			clearTimeout(debounceTimeout.value);
		}
		debounceTimeout.value = setTimeout(() => {
			filterTasks();
		}, debounceTime);
	};

	const addFilters = (filterId: string) => {
		if (filters.value.includes(filterId)) {
			filters.value = filters.value.filter((item) => item !== filterId);
		} else {
			filters.value = [...filters.value, filterId];
		}
		filterTasks();
	};

	const sortTasks = (option: string) => {
		sorting.value = option;
		filterTasks();
	};

	const filterTasks = () => {
		const searchedTasks = tasks.value.filter((task: Task) => {
			if (searchValue.value === "") {
				return true;
			}
			const searchValueNormalized = searchValue.value
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
			const taskTitleNormalized = task.title
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
			const taskDescriptionNormalized = task.description
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
			return (
				taskTitleNormalized.includes(searchValueNormalized) ||
				taskDescriptionNormalized.includes(searchValueNormalized)
			);
		});
		const filteredTasks = searchedTasks.filter((task: Task) => {
			if (filters.value.length === 0) {
				return true;
			}
			return filters.value.includes(task.status);
		});
		const sortedTasks = filteredTasks.sort((a: Task, b: Task) => {
			if (sorting.value === "newest") {
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				);
			} else {
				return (
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				);
			}
		});
		visibleTasks.value = sortedTasks;
	};

	const createTask = (task: Task) => {
		localStorage.setItem("tasks", JSON.stringify([...tasks.value, task]));
		tasks.value = [...tasks.value, task];
		filterTasks();
	};
	const getUserTasks = () => {
		const userTasks = localStorage.getItem("tasks");
		if (userTasks) {
			try {
				const parsedTasks = JSON.parse(userTasks);

				if (isTaskArray(parsedTasks)) {
					tasks.value = parsedTasks;
					return;
				}
			} catch (e) {
				console.error(
					"Error while parsing tasks from localstorage:",
					e
				);
			}
		}
		tasks.value = [
			{
				id: "1",
				title: "Do shopping",
				description: "Milk, bread, eggs, water",
				status: "todo",
				createdAt: "2025-02-01T10:00:00",
			},
			{
				id: "2",
				title: "Do laundry",
				description: "Remember laundry detergent",
				status: "inprogress",
				createdAt: "2025-02-02T11:00:00",
			},
			{
				id: "3",
				title: "Make dinner",
				description: "Pasta with tomato sauce",
				status: "done",
				createdAt: "2025-02-03T12:00:00",
			},
			{
				id: "4",
				title: "Clean the room",
				description: "Vacuum and mop the floor",
				status: "todo",
				createdAt: "2025-02-04T13:00:00",
			},
			{
				id: "5",
				title: "Write report",
				description: "Sales report for last month",
				status: "inprogress",
				createdAt: "2025-02-05T14:00:00",
			},
			{
				id: "6",
				title: "Call the client",
				description: "Discuss order details",
				status: "done",
				createdAt: "2025-02-06T15:00:00",
			},
			{
				id: "7",
				title: "Book tickets",
				description: "Tickets for a concert next month",
				status: "todo",
				createdAt: "2025-02-07T16:00:00",
			},
			{
				id: "8",
				title: "Read a book",
				description: "Finish reading the book 'The Art of War'",
				status: "inprogress",
				createdAt: "2025-02-08T17:00:00",
			},
			{
				id: "9",
				title: "Do backup",
				description: "Backup all important files to external drive",
				status: "done",
				createdAt: "2025-02-09T18:00:00",
			},
			{
				id: "10",
				title: "Fix the bike",
				description: "Replace inner tube and lubricate the chain",
				status: "todo",
				createdAt: "2025-02-10T19:00:00",
			},
		];
		localStorage.setItem("tasks", JSON.stringify(tasks.value));
	};

	const deleteTask = (uuid: string) => {
		const newTasks = tasks.value.filter((task: Task) => task.id !== uuid);
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		tasks.value = newTasks;
		filterTasks();
	};

	const editTask = (task: Task) => {
		const newTasks = tasks.value.map((item: Task) => {
			if (item.id === task.id) {
				return task;
			}
			return item;
		});
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		tasks.value = newTasks;
		filterTasks();
	};

	const taskDone = (uuid: string) => {
		const newTasks = tasks.value.map((task: Task) => {
			if (task.id === uuid) {
				return {
					...task,
					status: "done" as TaskStatus,
				};
			}
			return task;
		});
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		tasks.value = newTasks;
		filterTasks();
	};

	onBeforeMount(() => {
		getUserTaskStyle();
		getUserTasks();
		getUserDarkMode();
	});
	onMounted(() => {
		filterTasks();
	});
</script>
