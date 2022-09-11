<template lang="">
    <div class="flex flex-row w-screen box-border">
        <div class="w-fit">
            <SideBarNavigation />
        </div>
        <div class="flex flex-col h-screen grow overflow-x-auto">
            <div class="max-h-16 h-1/6">
                <TopBar />
            </div>
            <div class="p-8 grow h-5/6 overflow-x-auto">
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
