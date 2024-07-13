<template>
  <button @click="logout" :disabled="isLoading">
    {{ isLoading ? 'Loading...' : 'Logout' }}
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { logoutAction } from '../actions.ts/logout.action';
import { ref } from 'vue';
import { useToastStore } from '@/stores/useToastStore';

const isLoading = ref(false);
const toastStore = useToastStore();
const router = useRouter();

const logout = async () => {
  isLoading.value = true;
  const { success, message } = await logoutAction();
  isLoading.value = false;

  if (!success) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
    return;
  }

  toastStore.addToast({
    message: message,
    type: 'success',
  });

  router.push({ name: 'login' });
};
</script>
