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
      <error-alert-icon v-if="toast.type === 'error'" />
      <success-alert-icon v-if="toast.type === 'success'" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';
import ErrorAlertIcon from '@/modules/common/icons/ErrorAlertIcon.vue';
import SuccessAlertIcon from '@/modules/common/icons/SuccessAlertIcon.vue';

const toastStore = useToastStore();
</script>
