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
        <button type="submit" className="btn btn-sm btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Login' }}
        </button>
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
import { loginAction } from '../actions.ts/login.action';
import { useRoute, useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const router = useRouter();
const route = useRoute();

const submitLogin = async () => {
  isLoading.value = true;
  const { success, message } = await loginAction({ email: email.value, password: password.value });
  isLoading.value = false;

  if (!success) {
    alert(message);
    return;
  }

  const { nexturl } = route.query as { nexturl?: string };

  router.replace(nexturl ? nexturl : { name: 'dashboard' });
  return;
};
</script>
