<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createTask } from '../actions/tasks.actions';
import { useToastStore } from '@/stores/useToastStore';

const title = ref('');
const description = ref('');
const mode = ref<'create' | 'update'>('create');
const status = ref<'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELED'>('TODO');

const route = useRoute();
const router = useRouter();
const projectId = route.params.id as string;
const toastStore = useToastStore();

const handleCreate = async () => {
  const { success, message, data } = await createTask(projectId, {
    title: title.value,
    description: description.value,
    status: status.value,
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

  return router.push({ name: 'view-project', params: { id: projectId } });
};
const handleUpdate = async () => {};

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
  <form @submit.prevent="handleSubmit" class="card max-w-screen-md mx-auto">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Title</span>
      </label>
      <input
        v-model="title"
        type="text"
        placeholder="Title"
        class="input input-bordered"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea
        v-model="description"
        type="text"
        placeholder="Description"
        class="textarea textarea-bordered"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Status</span>
      </label>
      <select v-model="status" class="select select-bordered" name="status" id="status">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELED">CANCELED</option>
      </select>
    </div>
    <div class="form-control mt-6">
      <button type="submit" class="btn btn-primary btn-block">Submit</button>
    </div>
  </form>
</template>
