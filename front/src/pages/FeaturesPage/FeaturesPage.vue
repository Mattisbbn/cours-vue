<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'

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
    <Card class="w-24 h-24">
      <Button @click="makeNotification">Notification</Button>
    </Card>
  </BaseLayout>
</template>
