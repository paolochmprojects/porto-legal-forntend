import { useAuthStore } from "@/stores/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;

interface TasksGetResponse {
    tasks: Task[];
}

interface TasksCreateResponse {
    message: string;
    task: Task;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    project_id: string;
    status: string;
    created_at: string;
    updated_at: string;
}


export interface TaskCreateParams {
    title: string;
    description: string;
    status: string;
}

export const getTasksByProject = async (projectId: string) => {

    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            const { tasks } = await response.json() as TasksGetResponse;
            return { success: true, message: 'Get tasks successfully', data: tasks };
        }

        return { success: false, message: 'Get tasks failed', data: null };
    } catch (error) {
        return { success: false, message: 'Get tasks failed', data: null };
    }
}


export const createTask = async (projectId: string, params: TaskCreateParams): Promise<{ success: boolean, message: string, data: Task | null }> => {

    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.authToken}`
            },
            body: JSON.stringify(params),
        })

        if (response.status === 201) {
            const { message, task } = await response.json() as TasksCreateResponse;
            return { success: true, message, data: task };
        }

        return { success: false, message: 'Create task failed', data: null };

    } catch (error) {
        return { success: false, message: 'Create task failed', data: null };
    }
}


export const deleteTask = async (projectId: string, taskId: string) => {

    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            return { success: true, message: 'Delete task successfully', data: null };
        }

        return { success: false, message: 'Delete task failed', data: null };

    } catch (error) {
        return { success: false, message: 'Delete task failed', data: null };
    }
}