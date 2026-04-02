<script setup>
import { RouterLink } from 'vue-router'
import Button from './ui/button/Button.vue'
</script>
<template>
  <nav class="flex gap-4 p-6 bg-gray-100 align-center justify-between">
    <ul class="flex gap-4">
      <li><RouterLink :to="{ name: 'homepage' }">Homepage</RouterLink></li>
      <li><RouterLink :to="{ name: 'form' }">Formulaire</RouterLink></li>
      <li><RouterLink :to="{ name: 'todo' }">Todo API</RouterLink></li>
      <li><RouterLink :to="{ name: 'fonctionalites' }">Fonctionalités</RouterLink></li>
    </ul>
    <Button variant="outline">Super button shadcn</Button>
  </nav>
</template>
