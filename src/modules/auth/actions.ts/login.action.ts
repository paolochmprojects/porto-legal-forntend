import { useAuthStore } from "@/stores/useAuthStore";

interface LoginActionParams {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string
}

interface LoginActionResult {
    success: boolean;
    message: string;
}

const API_URL = 'http://localhost/api';
export const loginAction = async (params: LoginActionParams): Promise<LoginActionResult> => {

    const authStore = useAuthStore();

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })

        if (response.ok) {
            const data = await response.json() as LoginResponse;
            authStore.setAuthToken(data.token);
            return { success: true, message: 'Login successfully' }
        }

        return { success: false, message: 'Invalid email or password' }

    } catch (error) {
        return { success: false, message: 'Invalid email or password' }
    }
}