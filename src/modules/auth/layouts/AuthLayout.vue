<template>
  <div class="flex flex-col h-screen">
    <div class="flex-grow flex flex-col items-center justify-center">
      <router-view />
    </div>
    <footer-component />
  </div>
</template>

<script lang="ts" setup>
import FooterComponent from '@/modules/landing/components/FooterComponent.vue';
</script>
