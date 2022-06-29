<template lang="">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-2">
            <Avatar size="small" :src="user.avatar" alt="Avatar" />
            <p>{{ user.name }}</p>
        </div>
        <div class="flex flex-row">
            <button>
                <AppIcon name="closeSquare" type="light" color="#C4C4C4" />
            </button>
            <button>
                <AppIcon name="moreSqaure" type="light" color="#C4C4C4" />
            </button>
        </div>
    </div>
</template>


<script lang="ts">

const moreNavigation = [
    {
        name: 'Ansehen',
        icon: 'profile',
        action: () => alert('User Profil ansehen')
    },
]

export default {
    setup() {
        moreNavigation
    },
    props: {
        user: Object
    }
}
</script>