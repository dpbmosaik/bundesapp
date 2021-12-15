<template>
  <div
    class="register flex justify-center items-center content-center h-screen bg-gray-50"
  >
    <CardTemplate>
      <router-view></router-view>
    </CardTemplate>
  </div>
</template>

<script>
import CardTemplate from '@/modules/auth/components/CardTemplate.vue'

export default {
  name: 'RegisterMain',
  components: {
    CardTemplate
  },
  data () {
    return {}
  }
}
</script>
