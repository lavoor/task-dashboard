import { Task } from "@/types/task";

const isTask = (item: any): item is Task => {
    return (
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        ["todo", "inprogress", "done"].includes(item.status) &&
        typeof item.createdAt === "string" &&
        !isNaN(Date.parse(item.createdAt))
    );
};
export const isTaskArray = (data: any): data is Task[] => {
    return Array.isArray(data) && data.every(isTask);
};