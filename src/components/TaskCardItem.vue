<template>
    <div class="flex w-full lg:w-[27.375rem] flex-col justify-between gap-2 bg-stone-150
    dark:bg-stone-800 duration-150 transition-colors p-5 rounded-xl"
    >
        <div class="flex flex-col w-full gap-1">
            <div class="flex justify-between items-center gap-4">
                <span class="font-inter font-medium text-stone-800 dark:text-stone-50 text-ellipsis overflow-hidden whitespace-nowrap">{{ task.title }}</span>
                <div class="flex gap-6 items-center min-w-max">
                    <div @click="deleteTask(task.id)" class="w-4 h-4 p-0.5 flex justify-center items-center text-red-400 duration-150 hover:text-red-500 cursor-pointer select-none">
                        <span class="text-current">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                                <path d="M1 4.16667H12M5.125 6.83333V10.8333M7.875 6.83333V10.8333M1.6875 4.16667L2.375 12.1667C2.375 12.5203 2.51987 12.8594 2.77773 13.1095C3.03559 13.3595 3.38533 13.5 3.75 13.5H9.25C9.61467 13.5 9.96441 13.3595 10.2223 13.1095C10.4801 12.8594 10.625 12.5203 10.625 12.1667L11.3125 4.16667M4.4375 4.16667V2.16667C4.4375 1.98986 4.50993 1.82029 4.63886 1.69526C4.7678 1.57024 4.94266 1.5 5.125 1.5H7.875C8.05734 1.5 8.2322 1.57024 8.36114 1.69526C8.49007 1.82029 8.5625 1.98986 8.5625 2.16667V4.16667" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                    <div @click="showEditTaskDialog(task)" class="w-4 h-4 p-0.5 flex justify-center items-center text-stone-500 duration-150 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300 cursor-pointer select-none">
                        <span class="text-current">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <path d="M8.43716 2.93136L11.5686 6.06279M1 13.5H4.13144L12.3515 5.27998C12.5571 5.07437 12.7202 4.83027 12.8315 4.56162C12.9427 4.29297 13 4.00504 13 3.71426C13 3.42348 12.9427 3.13555 12.8315 2.8669C12.7202 2.59825 12.5571 2.35416 12.3515 2.14854C12.1458 1.94293 11.9017 1.77983 11.6331 1.66855C11.3645 1.55727 11.0765 1.5 10.7857 1.5C10.495 1.5 10.207 1.55727 9.93838 1.66855C9.66973 1.77983 9.42563 1.94293 9.22002 2.14854L1 10.3686V13.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                    <div @click="taskDone(task.id)" class="w-4 h-4 p-0.5 flex justify-center items-center text-stone-500 duration-150 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300 cursor-pointer select-none">
                        <span class="text-current">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                                <path d="M1 5L5 9L13 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <p class="text-stone-500 dark:text-stone-400 font-inter">{{ task.description }}</p>
        </div>
        <Transition mode="out-in">
            <div v-if="task.status === 'done'" class="flex gap-3 items-center text-lime-600 dark:text-lime-400">
                <span class="text-current">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                        <path d="M3.85714 3.05556H2.42857C2.04969 3.05556 1.68633 3.21944 1.41842 3.51117C1.15051 3.80289 1 4.19855 1 4.61111V13.9444C1 14.357 1.15051 14.7527 1.41842 15.0444C1.68633 15.3361 2.04969 15.5 2.42857 15.5H9.57143C9.95031 15.5 10.3137 15.3361 10.5816 15.0444C10.8495 14.7527 11 14.357 11 13.9444V4.61111C11 4.19855 10.8495 3.80289 10.5816 3.51117C10.3137 3.21944 9.95031 3.05556 9.57143 3.05556H8.14286M3.85714 3.05556C3.85714 2.643 4.00765 2.24733 4.27556 1.95561C4.54347 1.66389 4.90683 1.5 5.28571 1.5H6.71429C7.09317 1.5 7.45653 1.66389 7.72444 1.95561C7.99235 2.24733 8.14286 2.643 8.14286 3.05556M3.85714 3.05556C3.85714 3.46811 4.00765 3.86378 4.27556 4.1555C4.54347 4.44722 4.90683 4.61111 5.28571 4.61111H6.71429C7.09317 4.61111 7.45653 4.44722 7.72444 4.1555C7.99235 3.86378 8.14286 3.46811 8.14286 3.05556M3.85714 8.5H3.86429M6.71429 8.5H8.14286M3.85714 11.6111H3.86429M6.71429 11.6111H8.14286" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="text-current font-medium font-inter">Zrobione</span>
            </div>
            <div v-else-if="task.status === 'inprogress'" class="flex gap-3 items-center text-amber-600 dark:text-orange-300">
                <span class="text-current">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M6.38557 15.5C5.70384 15.3425 5.04911 15.0821 4.44313 14.7272M9.51853 1.5C11.0757 1.86214 12.4661 2.75189 13.4619 4.02357C14.4577 5.29526 15 6.87353 15 8.49999C15 10.1265 14.4577 11.7047 13.4619 12.9764C12.4661 14.2481 11.0757 15.1378 9.51853 15.5M2.13959 12.5619C1.71234 11.9298 1.38784 11.2318 1.17855 10.4946M1 7.30368C1.12532 6.54602 1.36656 5.82824 1.70492 5.17027L1.83729 4.92702M3.96297 2.58146C4.69582 2.06777 5.51796 1.70075 6.38554 1.5M5.60231 8.5L7.1688 10.0951L10.3018 6.90492" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="text-current font-medium font-inter">W trakcie</span>
            </div>
            <div v-else class="flex gap-3 items-center text-stone-500 dark:text-stone-400">
                <span class="text-current">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                        <path d="M3.85714 3.05556H2.42857C2.04969 3.05556 1.68633 3.21944 1.41842 3.51117C1.15051 3.80289 1 4.19855 1 4.61111V13.9444C1 14.357 1.15051 14.7527 1.41842 15.0444C1.68633 15.3361 2.04969 15.5 2.42857 15.5H9.57143C9.95031 15.5 10.3137 15.3361 10.5816 15.0444C10.8495 14.7527 11 14.357 11 13.9444V4.61111C11 4.19855 10.8495 3.80289 10.5816 3.51117C10.3137 3.21944 9.95031 3.05556 9.57143 3.05556H8.14286M3.85714 3.05556C3.85714 2.643 4.00765 2.24733 4.27556 1.95561C4.54347 1.66389 4.90683 1.5 5.28571 1.5H6.71429C7.09317 1.5 7.45653 1.66389 7.72444 1.95561C7.99235 2.24733 8.14286 2.643 8.14286 3.05556M3.85714 3.05556C3.85714 3.46811 4.00765 3.86378 4.27556 4.1555C4.54347 4.44722 4.90683 4.61111 5.28571 4.61111H6.71429C7.09317 4.61111 7.45653 4.44722 7.72444 4.1555C7.99235 3.86378 8.14286 3.46811 8.14286 3.05556M3.85714 8.5H3.86429M6.71429 8.5H8.14286M3.85714 11.6111H3.86429M6.71429 11.6111H8.14286" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="text-current font-medium font-inter">Do zrobienia</span>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { Task } from "@/types/task";
    const props = defineProps<{
        task: Task,
        taskDone: (uuid: string) => void,
        deleteTask: (uuid: string) => void,
        showEditTaskDialog: (task: Task) => void
    }>();
</script>