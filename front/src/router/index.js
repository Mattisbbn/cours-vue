import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage/HomePage.vue'
import FormPage from '@/pages/FormPage/FormPage.vue'
import TodoPage from '@/pages/TodoPage/TodoPage.vue'
import FeaturesPage from '@/pages/FeaturesPage/FeaturesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoPage,
    },
    {
      path: '/fonctionalites',
      name: 'fonctionalites',
      component: FeaturesPage,
    },
  ],
})

export default router
