<template lang="">
    <div class="flex flex-row w-screen overflow-hidden">
        <SideBarNavigation />
        <div class="flex flex-col grow h-screen overflow-hidden">
            <TopBar />
            <div class="p-8 grow">
                <router-view />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import SideBarNavigation from "@/components/layout/sideBarNavigation/SideBarNavigation.vue";
import TopBar from "@/components/layout/TopBar.vue";

export default {
    components: {
        SideBarNavigation,
        TopBar
    }
}
</script>
