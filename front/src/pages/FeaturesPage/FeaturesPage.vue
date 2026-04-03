<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'

const makeNotification = async () => {
  let permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    return
  }

  const title = 'Notification test'
  const options = {
    body: 'Voici une notification de test',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      await registration.showNotification(title, options)
      return
    }
  }

  const notification = new Notification(title, options)
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
