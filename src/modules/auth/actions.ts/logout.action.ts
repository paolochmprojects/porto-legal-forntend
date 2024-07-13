import { useAuthStore } from "@/stores/useAuthStore";

const API_URL = 'http://localhost/api';

interface LogoutActionResult {
    success: boolean;
    message: string;
}

export const logoutAction = async (): Promise<LogoutActionResult> => {

    const authStore = useAuthStore();

    try {
        const response = await fetch(`${API_URL}/logout`, {
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })

        if (response.ok) {
            return { success: true, message: 'Logout successfully' }
        }

        return { success: false, message: 'Logout failed' }

    } catch (error) {
        return { success: false, message: 'Logout failed' }
    } finally {
        authStore.removeAuthToken();
    }


}