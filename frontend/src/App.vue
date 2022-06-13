<template>
  <div class="min-h-full flex flex-row">
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import AppMain from '@/modules/app/AppMain.vue';
import Homepage from '@/modules/home/views/Main.vue';

// const RootComponent = {
//   data() {
//     return {
//       isAuthenticated: true,
//     };
//   },
// };

export default {
   data() {
    return {
      isAuthenticated: true,
    };
  },
  computed: {
    isAuth(): Boolean {
      // @ts-ignore
      return this.store.getters.isAuth
    }
  },
  components: {
    AppMain,
    Homepage
  },

};
</script>