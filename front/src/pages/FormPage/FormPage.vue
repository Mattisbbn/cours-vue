<script setup>
import { ref, computed } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue'

const step = ref(1)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
})

const onSubmit = () => {
  window.alert(
    `Prénom: ${formData.value.firstName} Nom: ${formData.value.lastName} Email: ${formData.value.email}`,
  )
}

const allStepsFilled = computed(() => {
  return formData.value.firstName && formData.value.lastName && formData.value.email
})
</script>

<template>
  <BaseLayout>
    <div class="m-auto w-1/2">
      <h2 class="text-xl my-4">Formulaire</h2>
      <form @submit.prevent="onSubmit" action="">
        <div class="flex gap-4">
          <ButtonGroup>
            <Button variant="outline" @click="step--" :disabled="step === 1" type="button">
              Précédent
            </Button>
            <Button variant="outline" @click="step++" :disabled="step === 3" type="button">
              Suivant
            </Button>
          </ButtonGroup>
        </div>

        <h1 class="text-center mb-4">Étape {{ step }}</h1>

        <Input
          size="md"
          v-model="formData.firstName"
          placeholder="Prénom"
          type="text"
          v-if="step === 1"
        />
        <Input
          size="md"
          v-model="formData.lastName"
          placeholder="Nom"
          type="text"
          v-if="step === 2"
        />
        <Input
          size="md"
          v-model="formData.email"
          placeholder="Email"
          type="text"
          v-if="step === 3"
        />

        <Button class="mt-10" variant="outline" size="lg" :disabled="!allStepsFilled"
          >Valider</Button
        >
      </form>
    </div>
  </BaseLayout>
</template>
