<template>
  <nav class="navbar bg-base-100 px-4">
    <div class="navbar-start">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Porto Legal</router-link>
    </div>
    <ul class="navbar-end gap-2">
      <li>
        <router-link class="link" :to="{ name: 'register' }">Resgister</router-link>
      </li>
      <li>
        <router-link class="link" :to="{ name: 'login' }">Login</router-link>
      </li>
    </ul>
  </nav>
</template>
