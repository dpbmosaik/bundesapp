<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <footer class="bg-dpbm-blue">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        <div v-for="item in navigation.main" :key="item.name" class="px-5 py-2">
          <a :href="item.href" class="text-base text-white hover:text-dpbm-yellow">
            {{ item.name }}
          </a>
        </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-6">
        <a v-for="item in navigation.social" :key="item.name" :href="item.href" class="text-white hover:text-dpbm-yellow">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p class="mt-8 text-center text-base text-gray-400">
        &copy; {{ currentYear }} Deutscher Pfadfinderbund Mosaik
      </p>
    </div>
  </footer>
</template>

<script>
import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';

const currentYear = new Date().getFullYear();

const navigation = {
  main: [
    { name: 'DPBM', href: '#' },
    { name: 'Log In', href: '#' },
    { name: 'Registrierung', href: '#' },
    { name: 'Demo', href: '#' },
    { name: 'Impressum', href: '#' },
    { name: 'Datenschutzerklärung', href: '#' },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: InstagramIcon,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: GithubIcon
    },
  ],
}

export default {
  name: 'FooterMain',
  setup() {
    return {
      navigation,
      currentYear
    }
  },
}
</script>