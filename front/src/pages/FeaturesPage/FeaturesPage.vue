<script setup>
import { ref } from 'vue'

import BaseLayout from '@/layouts/BaseLayout.vue'
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'

const localStorageInput = ref('')

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
    alert('Notification clicked!')
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem('localstorageTest', localStorageInput.value)
  alert('Valeur sauvegardée en localStorage : ' + localStorageInput.value)
}
</script>

<template>
  <BaseLayout>
    <div class="p-6 flex gap-6">
      <Card class="w-24 h-24 shadow-2xl bg-slate-200 flex align-center justify-center">
        <Button @click="makeNotification">Notification</Button>
      </Card>
      <Card class="w-48 h-24 shadow-2xl bg-slate-200 flex flex-col align-center justify-center">
        <div>
          <p class="text-center">Localstorage</p>

          <input type="text" v-model="localStorageInput" class="border rounded" />
          <button @click="saveToLocalStorage" class="bg-blue-500 text-white rounded">Save</button>
        </div>
      </Card>
    </div>
  </BaseLayout>
</template>
