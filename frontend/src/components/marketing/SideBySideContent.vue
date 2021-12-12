<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative bg-gray-50 py-16 sm:py-24">
    <div v-for="(item, index) in content" :key="item.title" class="flex flex-col lg:flex-row lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start mb-24 lg:mb-0">
      <div :class="{ 'lg:order-2': (index % 2) , 'lg:order-1': !(index % 2) }" class="order-1 relative sm:py-16 lg:py-0">
        <div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
          <!-- <div class="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" /> -->
          <svg class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" width="404" height="392" fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="392" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
          </svg>
        </div>
        <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
          <!-- Testimonial card-->
          <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
            <img class="absolute inset-0 h-full w-full object-cover" :src="item.image" :alt="item.title + ' - Illustration'" />
            <div class="absolute inset-0 bg-dpbm-blue-light mix-blend-multiply" />
            <div class="absolute inset-0 bg-gradient-to-t from-dpbm-blue via-dpbm-blue opacity-90" />
            

          </div>
          
        </div>
      </div>

      <div :class="{ 'lg:order-1': (index % 2), 'lg:order-2': !(index % 2) }" class="order-2 relative flex mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 h-full items-center">
        <!-- Content area -->
        <div class="pt-16 md:pt-0">
          <h2 class="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
            {{ item.title }}
          </h2>
          <div class="mt-6 text-gray-500 space-y-6 ">
            <p class="text-lg">
              {{ item.text }}
            </p>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
const content = [
  { 
    title: 'Unterstützend',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
  { 
    title: 'Übersichtlich',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
  { 
    title: 'Informativ',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
  { 
    title: 'Datenhoheit',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
  { 
    title: 'Vernetzend',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
  { 
    title: 'Automatisierend',
    text: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    image: "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100" 
  },
]

export default {
  setup() {
    return {
      content,
    }
  },
}
</script>