<script lang="ts" setup>
import FooterComponent from '../components/FooterComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
</script>
<template>
  <main class="min-h-screen flex flex-col">
    <nav-bar-component />
    <router-view />
    <footer-component />
  </main>
</template>
