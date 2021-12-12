<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-48 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Bereit loszulegen?</span>
        <span class="block text-dpbm-yellow">Fange jetzt an Zeit zu sparen</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
        <PrimaryButton :target="buttons.start.href" :content="buttons.start.name" size="l" />
        <SecondaryButton :target="buttons.contact.href" :content="buttons.contact.name" size="l" />
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

const buttons = {
    start: { name: 'Leg los', href: '/register' },
    contact: { name: 'Kontakt', href: '/contact' },
}

export default {
    name: "Cta Section",
    components: {
        SecondaryButton,
        PrimaryButton
    },
    setup() {
        return {
            buttons
        }
    },
}
</script>
