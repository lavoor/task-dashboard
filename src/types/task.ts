export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
    title: string,
    description: string,
    status: TaskStatus,
    id: string,
    createdAt: string,
}