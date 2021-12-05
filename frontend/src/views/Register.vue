<template>
  <div class="register flex justify-center items-center content-center h-screen bg-gray-50">
    <CardTemplate>
      <router-view></router-view>
    </CardTemplate>
  </div>
</template>

<script>
import CardTemplate from '../components/form/inputs/CardTemplate.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    CardTemplate
  }
}
</script>