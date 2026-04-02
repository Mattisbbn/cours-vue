<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseLayout from '@/layouts/BaseLayout.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { useTodoStore } from '@/stores/TodoStore'

const todoStore = useTodoStore()
const { todos, isLoading, isSaving, error, remainingCount } = storeToRefs(todoStore)

const todoTitle = ref('')

const addTodo = async () => {
  try {
    await todoStore.addTodo(todoTitle.value)
    todoTitle.value = ''
  } catch (error) {
    console.error('Error adding todo:', error)
  }
}

const toggleTodo = async (todo) => {
  try {
    await todoStore.toggleTodo(todo)
  } catch (err) {
    console.error('Error toggling todo:', err)
  }
}

const editTodo = async (todo) => {
  const nextTitle = window.prompt('Modifier le todo', todo.title)
  if (nextTitle === null) {
    return
  }

  try {
    await todoStore.updateTodoTitle(todo, nextTitle)
  } catch (err) {
    console.error('Error editing todo:', err)
  }
}

const deleteTodo = async (todoId) => {
  try {
    await todoStore.removeTodo(todoId)
  } catch (err) {
    console.error('Error deleting todo:', err)
  }
}

onMounted(async () => {
  try {
    await todoStore.fetchTodos()
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
})
</script>

<template>
  <BaseLayout>
    <div class="m-auto w-full max-w-2xl">
      <h2 class="text-xl my-4">Todo List</h2>
      <p class="mb-4 text-sm text-muted-foreground">Restants: {{ remainingCount }}</p>

      <div class="flex gap-2">
        <Input
          v-model="todoTitle"
          placeholder="Entrez un nouveau todo..."
          @keydown.enter="addTodo"
        />
        <Button variant="outline" :disabled="isSaving" @click="addTodo">Ajouter</Button>
      </div>

      <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>

      <p v-if="isLoading" class="mt-4 text-sm">Chargement...</p>

      <ul v-else-if="todos.length > 0" class="mt-6 space-y-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between rounded-md border px-3 py-2"
        >
          <label class="flex items-center gap-3">
            <input :checked="todo.isDone" type="checkbox" @change="toggleTodo(todo)" />
            <span :class="{ 'line-through text-muted-foreground': todo.isDone }">{{
              todo.title
            }}</span>
          </label>

          <div class="flex items-center gap-2">
            <Button size="sm" variant="outline" :disabled="isSaving" @click="editTodo(todo)">
              Modifier
            </Button>
            <Button size="sm" variant="outline" :disabled="isSaving" @click="deleteTodo(todo.id)">
              Supprimer
            </Button>
          </div>
        </li>
      </ul>

      <p v-else class="mt-4 text-sm text-muted-foreground">Aucun todo pour le moment.</p>
    </div>
  </BaseLayout>
</template>
