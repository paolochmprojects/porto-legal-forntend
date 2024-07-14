<script lang="ts" setup>
import LogoutBtnComponent from '@/modules/auth/components/LogoutBtnComponent.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserDataByToken } from '../actions/user.actions';

const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const name = ref<string>('');

onMounted(async () => {
  if (authStore.authToken) {
    const { success, data, message } = await getUserDataByToken(authStore.authToken);

    if (!success || !data) {
      authStore.removeAuthToken();
      toastStore.addToast({
        message,
        type: 'error',
      });
      router.push({ name: 'login', replace: true });
      return;
    }
    name.value = data.name;
  }
});
</script>
<template>
  <nav class="navbar bg-base-100 px-4">
    <div class="navbar-start">
      <router-link class="navbar-brand" :to="{ name: 'dashboard' }">Dashboard</router-link>
    </div>
    <ul class="navbar-end gap-2">
      <li class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="avatar placeholder indicator">
          <span class="indicator-item indicator-middle indicator-start badge badge-primary"></span>
          <div class="bg-neutral text-neutral-content w-12 rounded-full">
            <span class="text-2xl">{{ name[0] ?? 'U' }}</span>
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
        >
          <li>
            <router-link class="" :to="{ name: 'projects' }">My projects</router-link>
          </li>
          <li>
            <router-link class="" :to="{ name: 'profile' }"> Profile </router-link>
          </li>
          <li>
            <logout-btn-component></logout-btn-component>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
