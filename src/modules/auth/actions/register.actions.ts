interface RegisterActionParams {
    name: string;
    email: string;
    password: string;
}

interface RegisterActionResult {
    succcess: boolean;
    message: string;
}

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL)

export const registerAction = async (params: RegisterActionParams): Promise<RegisterActionResult> => {

    try {

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })

        if (response.ok) {
            return { succcess: true, message: 'Register successfully' }
        }

        return { succcess: false, message: 'Register failed' }
    } catch (error) {
        return { succcess: false, message: 'Register failed' }
    }
}