import { defineStore } from "pinia";
import { ref } from "vue";

const token = localStorage.getItem("token");

export const useAuthStore = defineStore("auth", () => {

    const authToken = ref<string | null>(token);
    const isLoggedIn = ref<boolean>(token !== null);

    const setAuthToken = (token: string) => {
        authToken.value = token;
        localStorage.setItem("token", token);
        isLoggedIn.value = true;
    }

    const removeAuthToken = () => {
        authToken.value = null;
        localStorage.removeItem("token");
        isLoggedIn.value = false;
    }

    return {
        authToken,
        setAuthToken,
        isLoggedIn,
        removeAuthToken
    }
})