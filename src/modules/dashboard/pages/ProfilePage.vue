<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { getUserDataByToken } from '../actions/user.actions';
import { computed, onMounted, ref } from 'vue';
import { useToastStore } from '@/stores/useToastStore';

const authStore = useAuthStore();
const toastStore = useToastStore();

const name = ref<string>('');
const email = ref<string>('');
const createdAt = ref<Date>(new Date());

const isLoading = ref(false);

const formattedCreatedAt = computed({
  get() {
    return createdAt.value.toISOString().slice(0, 16);
  },
  set(value: string) {
    createdAt.value = new Date(value);
  },
});

onMounted(async () => {
  isLoading.value = true;
  if (authStore.authToken) {
    const { success, data, message } = await getUserDataByToken(authStore.authToken);

    if (!success || !data) {
      authStore.removeAuthToken();
      toastStore.addToast({
        message,
        type: 'error',
      });
      return;
    }

    name.value = data.name;
    email.value = data.email;
    createdAt.value = new Date(data.created_at);

    toastStore.addToast({
      message: message,
      type: 'success',
    });
  }

  isLoading.value = false;
});
</script>
<template>
  <div class="card shadow-2xl max-w-screen-sm mx-auto">
    <div class="card-body">
      <h1 class="card-title text-4xl font-bebas-neue font-bold">Profile</h1>
      <div class="flex flex-col gap-2">
        <form>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="Paolo Charca Mamani"
              class="input input-bordered"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="paolo.dev.projects@gmail.com"
              class="input input-bordered"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Created at</span>
            </label>
            <input
              v-model="formattedCreatedAt"
              type="datetime-local"
              class="input input-bordered"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
