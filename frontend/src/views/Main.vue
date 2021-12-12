<template>
    <SideBarNavigation>

        <router-view></router-view>

    </SideBarNavigation>
</template>

<script>


import SideBarNavigation from '../components/app/SideBarNavigation.vue'



export default {
  components: {
    SideBarNavigation
  },
  setup() {


    return {

    }
  },
}
</script>