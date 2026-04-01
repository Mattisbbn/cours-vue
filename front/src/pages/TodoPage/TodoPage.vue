<script setup>
import { ref } from 'vue'
import { apiFetch } from '@/utils/ApiFetch'
import BaseLayout from '@/layouts/BaseLayout.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

import { onMounted } from 'vue'

const todoTitle = ref('')

const todoList = ref([])

const addTodo = async () => {
  try {
    const response = await apiFetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoTitle.value }),
    })
    const data = await response.json()
    console.log('Added todo:', data)
    todoTitle.value = ''
  } catch (error) {
    console.error('Error adding todo:', error)
  }
}

onMounted(async () => {
  try {
    const response = await apiFetch('/todos')
    const data = await response.json()
    todoList.value = data['member']
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
})
</script>

<template>
  <BaseLayout>
    <div class="m-auto w-1/2">
      <h2 class="text-xl my-4">Todo List</h2>
      <Input v-model="todoTitle" placeholder="Entrez un nouveau todo..." />
      <Button variant="outline" class="mt-4" @click="addTodo">Ajouter TODO</Button>
    </div>

    <ul v-if="todoList.length > 0">
      <li v-for="todo in todoList" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </BaseLayout>
</template>
