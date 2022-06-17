<template>
  <div class="min-h-full overflow-y-hidden max-h-screen">
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import AppMain from '@/modules/app/AppMain.vue';
import Homepage from '@/modules/home/views/Main.vue';

export default {
   data() {
    return {
      isAuthenticated: true,
    };
  },
  components: {
    AppMain,
    Homepage
  },

};
</script>