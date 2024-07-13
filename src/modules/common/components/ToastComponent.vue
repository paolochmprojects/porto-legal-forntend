<template>
  <div class="toast">
    <div
      role="alert"
      v-for="(toast, index) in toastStore.toasts"
      :key="index"
      :class="[
        'alert',
        toast.type === 'success' && 'alert-success',
        toast.type === 'error' && 'alert-error',
      ]"
    >
      <div>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';

const toastStore = useToastStore();
</script>
