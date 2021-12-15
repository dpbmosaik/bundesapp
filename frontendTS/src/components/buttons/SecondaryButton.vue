<template>
    <span class="inline-flex rounded-md shadow">

      <span v-if="typeof target === 'string' && target.startsWith('http')" target="_blank" rel="noopener">
        <a v-if="size === 's'" :href="target" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 hover:text-dpbm-blue-light">
          {{ content }}
        </a>

        <a v-else-if="size === 'l'" target="_blank" rel="noopener" :href="target" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
          {{ content }}
        </a>
      </span>

      <span v-else-if="typeof target === 'function'">
        <button v-if="size === 's'" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 hover:text-dpbm-blue-light" @click="target">
          {{ content }}
        </button>
        <button v-else-if="size === 'l'" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dpbm-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10" @click="target">
          {{ content }}
        </button>
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
    target: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    size: {
      default: 's',
      type: String
    }
  }
}
</script>
