<script setup lang="ts">
import { RouterView } from 'vue-router';
import ToastComponent from '@/modules/common/components/ToastComponent.vue';
</script>

<template>
  <router-view />
  <toast-component />
</template>
