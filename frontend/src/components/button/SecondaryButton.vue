<template>
    <div class="rounded-md w-fit">
      
      <!-- External Websites -->
      <div v-if="typeof target === 'string' && target.startsWith('http')" class="flex flex-row gap-2 items-center">
        <AppIcon v-if="icon" :name="icon" type="light" />
        <a target="_blank" rel="noopener" :href="target" class="btn-s" :class="disabled ? 'disabled-button pointer-events-none' : 'active-button'">
          <slot></slot>
        </a>
      </div>

      <!-- Actions -->
      <div v-else-if="typeof target === 'function'" class="flex flex-row gap-2 items-center">
      <AppIcon v-if="icon" :name="icon" type="light" />
        <button class="btn-s" :class="disabled ? 'disabled-button pointer-events-none' : 'active-button'" :disabled="disabled" @click="target">
          <slot></slot>
        </button>
      </div>

      <!-- Internal Router Pages --> 
      <!-- router links can't be disabled yet -->
      <div v-else class="flex flex-row gap-2 items-center">
        <AppIcon v-if="icon" :name="icon" type="light" />
        <router-link :to="target" :class="disabled ? 'disabled-button pointer-events-none' : 'active-button'">
            <slot></slot>
        </router-link>
      </div>

    </div>
</template>

<script lang="ts">
import AppIcon from "../icons/AppIcon.vue"
export default defineComponent({
  name: 'SecondaryButton',
  components: {
    AppIcon
  },
  props: {
    target: {
      type: [Function, String],
    },
    disabled: {
      default: false,
      type: Boolean
    },
    icon: {
        default: '',
        type: String
    }
  }
})
</script>

<style lang="postcss" scoped>
    .active-button {
        @apply hover:bg-proto-darkgrey px-6 py-2 hover:text-white rounded-lg min-w-fit whitespace-nowrap bg-white text-proto-darkgrey border-2 border-proto-darkgrey
    }
    .disabled-button {
        @apply px-6 py-2 rounded-lg min-w-fit whitespace-nowrap bg-white text-proto-grey border-2 border-proto-grey
    }
</style>