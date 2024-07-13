import { useAuthStore } from "@/stores/useAuthStore";
import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router";

export const authenticatedGuard = async (
    to: RouteLocationNormalizedGeneric,
    _from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext) => {

    const authStore = useAuthStore();

    const nextUrl = to.fullPath;

    if (authStore.isLoggedIn) return next();

    return next({ name: 'login', query: { nexturl: nextUrl } });
}