<template>
    <p>Button</p>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Button',
  props: {
    target: String,
    content: String,
    size: {
      default: 's',
      type: String
    }
  }
}
</script>