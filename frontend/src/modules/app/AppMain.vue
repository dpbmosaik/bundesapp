<template lang="">
    <div class="flex flex-row">
        <SideBarNavigation />
        <router-view />
    </div>
</template>


<script lang="ts">
import SideBarNavigation from "@/components/layout/sideBarNavigation/SideBarNavigation.vue"

export default {
    components: {
        SideBarNavigation
    }
}
</script>
