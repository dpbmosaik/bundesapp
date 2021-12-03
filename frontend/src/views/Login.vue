<template>
  <div class="bg-gray-50 h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Melde dich mit deinem Account an
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Oder
        {{ ' ' }}
        <router-link to="/register" class="font-medium text-dpbm-blue hover:text-dpbm-blue-light">registriere dich jetzt</router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit="login" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-dpbm-blue-light focus:border-dpbm-blue-light sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Passwort
            </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-dpbm-blue-light focus:border-dpbm-blue-light sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="rememberMe" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-dpbm-blue focus:ring-dpbm-blue-light border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Angemeldet bleiben
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-dpbm-blue hover:text-dpbm-blue-light">
                Passwort vergessen?
              </a>

            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dpbm-blue hover:bg-dpbm-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dpbm-blue-light">
              Anmelden
            </button>
          </div>
        </form>


      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'



export default {
  name: 'Log In',
  components: {
    
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    login: function(e) {
      const email = this.email; //string
      const password = this.password; //string
      const rememberMe = this.rememberMe; //true/false

      console.log(e)
      console.log(email)
      console.log(password)
      console.log(rememberMe)

      e.preventDefault()
    }
  },
  setup() {
    return {
      
    }
  }
}
</script>