<template>
    <span class="inline-flex rounded-md shadow">

      <span target="_blank" rel="noopener" v-if="typeof target === 'string' && target.startsWith('http')">
        <a v-if="size === 's'" :href="target" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 hover:text-dpbm-blue-light">
          {{ content }}
        </a>

        <a target="_blank" rel="noopener" v-else-if="size === 'l'" :href="target" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
          {{ content }}
        </a>
      </span>

      <span v-else>
        <router-link v-if="size === 's'" :to="target" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 hover:text-dpbm-blue-light">{{ content }}</router-link>
        <router-link v-else-if="size === 'l'" :to="target" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">{{ content }}</router-link>
      </span>

    </span>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// console.log(size)

export default {
  name: 'SecondaryButton',
  props: {
    target: String,
    content: String,
    size: {
      default: 's',
      type: String
    }
  }
}
</script>