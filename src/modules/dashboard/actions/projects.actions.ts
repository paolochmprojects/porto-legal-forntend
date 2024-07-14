import { useAuthStore } from "@/stores/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export interface ProjectsGetResponse {
    projects: Project[];
}

export interface ProjectGetResponse {
    project: Project;
}

export interface ProjectCreateResponse {
    message: string;
    data: Project;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface ProjectCreateParams {
    title: string;
    description: string;
}


export const getProjects = async () => {
    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            const { projects } = await response.json() as ProjectsGetResponse;
            return { success: true, message: 'Get projects successfully', data: projects };
        }

        return { success: false, message: 'Get projects failed', data: null };
    } catch (error) {
        return { success: false, message: 'Get projects failed', data: null };
    }
}

export const getProject = async (id: string) => {
    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            const { project } = await response.json() as ProjectGetResponse;
            return { success: true, message: 'Get project successfully', data: project };
        }

        return { success: false, message: 'Get project failed', data: null };
    } catch (error) {
        return { success: false, message: 'Get project failed', data: null };
    }
}

export const deleteProject = async (id: string) => {
    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            return { success: true, message: 'Delete project successfully', data: null };
        }

        return { success: false, message: 'Delete project failed', data: null };
    } catch (error) {
        return { success: false, message: 'Delete project failed', data: null };
    }
}

export const createProject = async (params: ProjectCreateParams) => {
    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.authToken}`
            },
            body: JSON.stringify(params),
        })

        if (response.ok) {

            const { message, data } = await response.json() as ProjectCreateResponse;

            return { success: true, message, data };
        }

        return { success: false, message: 'Create project failed', data: null };
    } catch (error) {
        return { success: false, message: 'Create project failed', data: null };
    }
}

export const updateProject = async (id: string, params: ProjectCreateParams) => {
    try {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.authToken}`
            },
            body: JSON.stringify(params),
        })

        if (response.ok) {
            const { message, data } = await response.json() as ProjectCreateResponse;
            return { success: true, message, data };
        }

        return { success: false, message: 'Update project failed', data: null };

    } catch (error) {
        return { success: false, message: 'Update project failed', data: null };
    }
}