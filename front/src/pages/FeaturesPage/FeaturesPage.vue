<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'

const makeNotification = () => {
  const notification = new Notification('Hello world!', {
    body: 'This is a notification from Vue.js',
    icon: 'https://vuejs.org/images/logo.png',
  })

  notification.onclick = () => {
    console.log('Notification clicked!')
  }
}
</script>

<template>
  <BaseLayout>
    <div @click="makeNotification">Notification</div>
  </BaseLayout>
</template>
