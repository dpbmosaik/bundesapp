<template>
  <div>
    <button
      @click="onLoginClicked"
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
    >
      Login
    </button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  setup () {
    // Should work referencing custom property on 'this' in typescript
    function onLoginClicked() {
      console.log('App created', this.$keycloak)
      this.$keycloak.login()
    }
    return [onLoginClicked]
  }
});
</script>