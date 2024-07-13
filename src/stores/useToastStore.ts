import { defineStore } from "pinia";
import { ref } from "vue";

interface Toast {
    message: string;
    type: "success" | "error";
}


export const useToastStore = defineStore("toast", () => {

    const toasts = ref<Toast[]>([]);

    const addToast = (newToast: Toast) => {

        toasts.value.push(newToast);

        setTimeout(() => {
            toasts.value.shift();
        }, 3000);
    }

    return { toasts, addToast }
})