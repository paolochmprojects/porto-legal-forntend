import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';
import HomePage from '@/modules/landing/pages/HomePage.vue';
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
                    component: () => import('@/modules/auth/pages/LoginPage.vue'),
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('@/modules/auth/pages/RegisterPage.vue'),
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/modules/common/pages/NotFoundPage.vue'),
        },
    ],
});

export default router;
