<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createProject, getProject, updateProject } from '../actions/projects.actions';

const title = ref<string>('');
const description = ref<string>('');
const mode = ref<'create' | 'update'>('create');

const toastStore = useToastStore();
const router = useRouter();
const route = useRoute();

const fetchProject = async () => {
  const projectId = route.params.id as string | undefined;

  if (!projectId) return;

  const { success, data, message } = await getProject(projectId);

  if (!success || !data) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
    return;
  }

  mode.value = 'update';
  title.value = data.title;
  description.value = data.description;
};

watch(title, (newvalue) => {
  if (newvalue.length > 64) {
    toastStore.addToast({
      message: 'Title cannot be longer than 64 characters',
      type: 'error',
    });
  }
});

onMounted(async () => {
  await fetchProject();
});

const handleCreate = async () => {
  const { success, message, data } = await createProject({
    title: title.value,
    description: description.value,
  });

  if (!success || !data) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
    return;
  }

  toastStore.addToast({
    message: message,
    type: 'success',
  });

  router.push({ name: 'view-project', params: { id: data.id } });
  mode.value = 'update';
};

const handleUpdate = async () => {
  const projectId = route.params.id as string | undefined;

  if (!projectId) return;

  const { success, message } = await updateProject(projectId, {
    title: title.value,
    description: description.value,
  });

  if (!success) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
  }

  if (success) {
    toastStore.addToast({
      message: message,
      type: 'success',
    });
  }
};

const handleSubmit = async () => {
  if (mode.value === 'create') {
    await handleCreate();
  }

  if (mode.value === 'update') {
    await handleUpdate();
  }
};
</script>

<template>
  <div class="card shadow-2xl max-w-screen-md mx-auto">
    <form @submit.prevent="handleSubmit" class="card-body">
      <div class="flex gap-2 items-center">
        <h1 class="card-title text-4xl font-bebas-neue font-bold">Project</h1>
        <router-link :to="{ name: 'projects' }" type="submit" class="link link-primary">
          🏠 Back to projects
        </router-link>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="title"
          type="text"
          placeholder="Project Name"
          class="input input-bordered input-sm"
          required
        />
        <div class="label">
          <span class="label-text-alt">* Required. Max 64 characters.</span>
        </div>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          v-model="description"
          type="text"
          placeholder="Project description..."
          class="textarea textarea-bordered textarea-sm"
          required
        />
        <div class="label">
          <span class="label-text-alt">* Required. Max 255 characters.</span>
        </div>
      </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary btn-sm">
          <span v-if="mode === 'create'">Create</span>
          <span v-if="mode === 'update'">Update</span>
        </button>
      </div>
    </form>
  </div>
</template>
