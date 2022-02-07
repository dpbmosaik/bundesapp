<template>
  <SideBarNavigation>
    <router-view></router-view>
  </SideBarNavigation>
</template>

<script>
import SideBarNavigation from '@/layouts/SideBarNavigation.vue'

export default {
  name: 'MainMain',
  components: {
    SideBarNavigation
  },
  setup () {
    return {}
  }
}
</script>
