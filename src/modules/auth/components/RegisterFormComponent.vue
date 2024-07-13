<template>
  <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form @submit.prevent="submitRegister" className="card-body min-w-96">
      <h1 class="text-4xl font-bebas-neue font-bold">Register</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          v-model="name"
          type="text"
          placeholder="Paolo Charca Mamani"
          className="input input-bordered"
          required
        />
      </div>
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
        <button type="submit" className="btn btn-primary btn-sm">Create Account</button>
        <div className="divider">o</div>
        <div class="flex flex-col gap-4">
          <router-link :to="{ name: 'login' }" className="btn btn-primary btn-sm">
            Login
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

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const submitRegister = () => {
  console.log(name.value, email.value, password.value);
};
</script>
