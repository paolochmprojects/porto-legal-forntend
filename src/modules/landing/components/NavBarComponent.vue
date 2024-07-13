<template>
  <nav class="navbar bg-base-100 px-4">
    <div class="navbar-start">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Porto Legal</router-link>
    </div>
    <ul class="navbar-end gap-2">
      <li v-if="authStore.isLoggedIn">
        <router-link class="btn btn-secondary btn-link" :to="{ name: 'dashboard' }">
          Dashboard
        </router-link>
      </li>
      <li v-if="authStore.isLoggedIn">
        <logout-btn-component class="btn btn-secondary btn-link" />
      </li>
      <li v-if="!authStore.isLoggedIn">
        <router-link class="btn btn-secondary btn-link" :to="{ name: 'register' }">
          Resgister
        </router-link>
      </li>
      <li v-if="!authStore.isLoggedIn">
        <router-link class="btn btn-secondary btn-link" :to="{ name: 'login' }">
          Login
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore';
import LogoutBtnComponent from '@/modules/auth/components/LogoutBtnComponent.vue';
const authStore = useAuthStore();
</script>
