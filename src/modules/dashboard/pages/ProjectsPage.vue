<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';
import { onMounted, ref } from 'vue';
import { deleteProject, getProjects, type Project } from '../actions/projects.actions';

const projects = ref<Project[]>([]);
const toastStore = useToastStore();

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const handleDelete = async (id: string) => {
  const { success, message } = await deleteProject(id);

  if (success) {
    await fetchProjects();
    toastStore.addToast({
      message: message,
      type: 'success',
    });
  }

  if (!success) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
  }
};

const fetchProjects = async () => {
  const { success, data, message } = await getProjects();

  if (data) {
    projects.value = data;
  }

  if (!success) {
    toastStore.addToast({
      message: message,
      type: 'error',
    });
  }
};

onMounted(async () => {
  await fetchProjects();
});
</script>

<template>
  <div class="card shadow-2xl max-w-screen-xl mx-auto">
    <div class="card-body">
      <div class="flex gap-4 items-center">
        <h1 class="text-4xl font-bebas-neue font-bold">Projects</h1>
        <router-link :to="{ name: 'create-project' }" class="btn btn-primary btn-xs"
          >+ create</router-link
        >
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, index) in projects" :key="project.id">
              <td>{{ index + 1 }}</td>
              <td>{{ project.title }}</td>
              <td class="truncate max-w-md">{{ project.description }}</td>
              <td>{{ formatDate(project.created_at) }}</td>
              <td>{{ formatDate(project.updated_at) }}</td>
              <td class="flex gap-2">
                <router-link
                  :to="{ name: 'view-project', params: { id: project.id } }"
                  class="btn btn-primary btn-xs"
                >
                  View
                </router-link>
                <button @click="handleDelete(project.id)" class="btn btn-error btn-xs">
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
