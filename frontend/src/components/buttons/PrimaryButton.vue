<template>
    <span class="rounded-md shadow">
      
      <!-- External Websites -->
      <span v-if="typeof target === 'string' && target.startsWith('http')">
        <a v-if="size === 's'" target="_blank" rel="noopener" :href="target" class="btn-s" :class="disabled ? 'btn-bg-disabled pointer-events-none' : 'btn-bg'">
          {{ content }}
        </a>

        <a v-else-if="size === 'l'" target="_blank" rel="noopener" :href="target" class="btn-l" :class="disabled ? 'btn-bg-disabled pointer-events-none' : 'btn-bg'">
          {{ content }}
        </a>
      </span>

      <!-- Actions -->
      <span v-else-if="typeof target === 'function'">
        <button v-if="size === 's'" class="btn-s" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'" :disabled="disabled" @click="target">
          {{ content }}
        </button>
        <button v-else-if="size === 'l'" class="btn-l" :class="disabled ? 'btn-bg-disabled' : 'btn-bg'" :disabled="disabled" @click="target">
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
    },
    disabled: {
      default: false,
      type: Boolean
    }
  }
}
</script>
