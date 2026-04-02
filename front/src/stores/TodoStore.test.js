import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './TodoStore'

// Mock apiFetch
vi.mock('@/utils/ApiFetch', () => ({
  apiFetch: vi.fn(),
}))

import { apiFetch } from '@/utils/ApiFetch'

describe('TodoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('remainingCount', () => {
    it('donne le nombre de todos non terminés', () => {
      const store = useTodoStore()
      store.todos = [
        { id: 1, title: 'Todo 1', isDone: false },
        { id: 2, title: 'Todo 2', isDone: true },
        { id: 3, title: 'Todo 3', isDone: false },
      ]

      expect(store.remainingCount).toBe(2)
    })
  })

  describe('addTodo', () => {
    it('ajoute un nouveau todo à la liste', async () => {
      const store = useTodoStore()
      const newTodo = { id: 1, title: 'New Todo', isDone: false }

      apiFetch.mockResolvedValueOnce({
        json: async () => newTodo,
      })

      const result = await store.addTodo('New Todo')

      expect(store.todos[0]).toEqual(newTodo)
      expect(result).toEqual(newTodo)
    })
  })
})
