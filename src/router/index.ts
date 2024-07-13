import { authenticatedGuard } from '@/modules/auth/guards/authenticated.guard';
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';
import HomePage from '@/modules/landing/pages/HomePage.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'landing' },
            component: LandingLayout,
            children: [
                {
                    path: '',
                    name: 'landing',
                    component: HomePage,
                },
            ],
        },
        {
            path: '/auth',
            redirect: '/auth/login',
            name: 'auth',
            component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    beforeEnter: (to, from, next) => {
                        const authStore = useAuthStore();
                        if (authStore.isLoggedIn) {
                            next({ name: 'dashboard' });
                        } else {
                            next();
                        }
                    },
                    component: () => import('@/modules/auth/pages/LoginPage.vue'),
                },
                {
                    path: 'register',
                    name: 'register',
                    beforeEnter: (to, from, next) => {
                        const authStore = useAuthStore();
                        if (authStore.isLoggedIn) {
                            next({ name: 'dashboard' });
                        } else {
                            next();
                        }
                    },
                    component: () => import('@/modules/auth/pages/RegisterPage.vue'),
                }
            ]
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            beforeEnter: [authenticatedGuard],
            component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/modules/common/pages/NotFoundPage.vue'),
        },
    ],
});

export default router;
