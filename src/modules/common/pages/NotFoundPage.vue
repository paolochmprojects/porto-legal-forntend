<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <h1 class="text-9xl font-bold font-bebas-neue">404</h1>
    <p class="text-2xl">Upps... 😞 Page not found</p>
    <router-link :to="{ name: 'home' }" class="btn btn-primary btn-md text-base">
      🏠 Back to Home
    </router-link>
  </div>
</template>
