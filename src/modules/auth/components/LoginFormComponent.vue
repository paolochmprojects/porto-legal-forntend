<template>
  <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form @submit.prevent="submitLogin" className="card-body">
      <h1 class="text-4xl font-bebas-neue font-bold">Login</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="paolo.dev.projects@gmail.com"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="supersecretpassword124"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-sm btn-primary">Login</button>
        <div className="divider">o</div>
        <div class="flex flex-col gap-4">
          <router-link :to="{ name: 'register' }" className="btn btn-sm btn-primary">
            Create Account
          </router-link>
          <router-link :to="{ name: 'home' }" className="btn btn-link btn-sm">
            🏠 Back to home
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const submitLogin = () => {
  console.log(email.value, password.value);
};
</script>
