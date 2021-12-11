<template>
    <span class="rounded-md shadow">
      
      <!-- External Websites -->
      <span v-if="typeof target === 'string' && target.startsWith('http')">
        <a target="_blank" rel="noopener" v-if="size === 's'" :href="target" class="btn-s" :class="disabled ? 'btn-bg-disabled pointer-events-none' : 'btn-bg'">
          {{ content }}
        </a>

        <a target="_blank" rel="noopener" v-else-if="size === 'l'" :href="target" class="btn-l" :class="disabled ? 'btn-bg-disabled pointer-events-none' : 'btn-bg'">
          {{ content }}
        </a>
      </span>

      <!-- Actions -->
      <span v-else-if="typeof target === 'function'">
        <button v-if="size === 's'" @click="target" class="btn-s" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'" :disabled="disabled">
          {{ content }}
        </button>
        <button v-else-if="size === 'l'" @click="target" class="btn-l" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'" :disabled="disabled">
          {{ content }}
        </button>
      </span>

      <!-- Internal Router Pages --> 
      <!-- router links can't be disabled yet -->
      <span v-else>
        <router-link v-if="size === 's'" :to="target" class="btn-s" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'">{{ content }}</router-link>
        <router-link v-else-if="size === 'l'" :to="target" class="btn-l" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'">{{ content }}</router-link>
      </span>

    </span>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'PrimaryButton',
  props: {
    target: String,
    content: String,
    size: {
      default: 's',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-s {
    @apply items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white;
  }
  .btn-l {
    @apply w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10;
  }
  .btn-bg {
    @apply bg-dpbm-blue hover:bg-dpbm-blue-dark
  }
  .btn-bg-disabled {
    @apply bg-gray-400 cursor-not-allowed
  }
</style>