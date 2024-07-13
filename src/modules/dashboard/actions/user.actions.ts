const API_URL = import.meta.env.VITE_API_URL;

export interface UserMeResonse {
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}


export const getUserDataByToken = async (token: string)
    : Promise<{ success: boolean, message: string, data: User | null }> => {

    try {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const { user } = await response.json() as UserMeResonse;

            return { success: true, message: 'Get user data successfully', data: user };
        }

        if (response.status === 401) {
            const data = await response.json() as { message: string };
            return { success: false, message: data.message, data: null };
        }

        return { success: false, message: 'Get user data failed', data: null };
    } catch (error) {
        return { success: false, message: 'Get user data failed', data: null };
    }
}
