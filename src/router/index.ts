import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '@/modules/common/pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
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
            component: NotFoundView,
        },
    ],
});

export default router;
