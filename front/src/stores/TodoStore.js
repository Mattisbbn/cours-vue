import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/ApiFetch'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  const remainingCount = computed(() => todos.value.filter((todo) => !todo.isDone).length)

  const fetchTodos = async () => {
    isLoading.value = true

    try {
      const response = await apiFetch('/todos')
      const data = await response.json()
      todos.value = data['member']
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addTodo = async (title) => {
    const cleanTitle = title?.trim()
    if (!cleanTitle) {
      return
    }

    isSaving.value = true

    try {
      const response = await apiFetch('/todos', {
        method: 'POST',
        body: JSON.stringify({ title: cleanTitle }),
      })

      const createdTodo = await response.json()
      todos.value.unshift(createdTodo)
      return createdTodo
    } catch (err) {
      console.error(err)
    } finally {
      isSaving.value = false
    }
  }

  const updateTodo = async (id, payload) => {
    const response = await apiFetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  }

  const toggleTodo = async (todo) => {
    isSaving.value = true

    try {
      const updatedTodo = await updateTodo(todo.id, { isDone: !todo.isDone })
      const index = todos.value.findIndex((item) => item.id === todo.id)

      if (index !== -1) {
        todos.value[index] = updatedTodo
      }

      return updatedTodo
    } catch (err) {
      console.error(err)
    } finally {
      isSaving.value = false
    }
  }

  const updateTodoTitle = async (todo, title) => {
    const cleanTitle = title?.trim()
    if (!cleanTitle || cleanTitle === todo.title) {
      return todo
    }

    isSaving.value = true

    try {
      const updatedTodo = await updateTodo(todo.id, { title: cleanTitle })
      const index = todos.value.findIndex((item) => item.id === todo.id)

      if (index !== -1) {
        todos.value[index] = updatedTodo
      }

      return updatedTodo
    } catch (err) {
      console.error(err)
    } finally {
      isSaving.value = false
    }
  }

  const removeTodo = async (todoId) => {
    isSaving.value = true

    try {
      const response = await apiFetch(`/todos/${todoId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Echec de la création du todo`)
      }

      todos.value = todos.value.filter((todo) => todo.id !== todoId)
    } catch (err) {
      console.error(err)
    } finally {
      isSaving.value = false
    }
  }

  return {
    todos,
    isLoading,
    isSaving,
    remainingCount,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodoTitle,
    removeTodo,
  }
})
