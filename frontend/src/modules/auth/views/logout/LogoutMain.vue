<template>
  <div>
    <button
      @click="onLogoutClicked"
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
    >
      Logout
    </button>
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "LogIn",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    onLogoutClicked: function () {
    },
  },
};
</script>