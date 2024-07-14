<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { deleteTask, getTasksByProject, type Task } from '../actions/tasks.actions';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  projectId: string;
}

const props = defineProps<Props>();
const toastStore = useToastStore();

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const handleDelete = async (projectId: string, taskId: string) => {
  const { success, message } = await deleteTask(projectId, taskId);
  if (!success) {
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
  await fetchTasks();
};

const fetchTasks = async () => {
  const { success, data } = await getTasksByProject(props.projectId);
  if (!success || !data) return;
  tasks.value = data;
};

onMounted(async () => {
  await fetchTasks();
});

const tasks = ref<Task[]>([]);
</script>
<template>
  <div class="card shadow-2xl max-w-screen-xl mx-auto">
    <div class="card-body">
      <div class="flex gap-4">
        <h1 class="card-title">Tasks</h1>
        <router-link
          :to="{ name: 'create-task', params: { id: props.projectId } }"
          class="btn btn-primary btn-xs"
        >
          + create
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="task.id">
              <td>{{ index + 1 }}</td>
              <td>{{ task.title }}</td>
              <td class="truncate max-w-md">{{ task.description }}</td>
              <td>
                <div v-if="task.status === 'TODO'" class="badge badge-outline badge-primary">
                  {{ task.status }}
                </div>
                <div
                  v-if="task.status === 'IN_PROGRESS'"
                  class="badge badge-outline badge-secondary"
                >
                  {{ task.status }}
                </div>
                <div v-if="task.status === 'DONE'" class="badge badge-outline badge-success">
                  {{ task.status }}
                </div>
                <div v-if="task.status === 'CANCELED'" class="badge badge-outline badge-error">
                  {{ task.status }}
                </div>
              </td>
              <td>{{ formatDate(task.created_at) }}</td>
              <td>{{ formatDate(task.updated_at) }}</td>
              <td>
                <button
                  class="btn btn-error btn-xs"
                  @click="handleDelete(props.projectId, task.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
