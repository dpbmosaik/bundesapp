<template>
  <div>
    Logout
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  created () {
    // Should work referencing custom property on 'this' in typescript
    console.log('App created', this.$keycloak)
    this.$keycloak.logoutFn()
  }
});
</script>