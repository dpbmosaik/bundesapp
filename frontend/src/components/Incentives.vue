<template>
   <div class="relative">
    <div class="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4 ">
        
      <div class="max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 z-10">
        <div v-for="incentive in incentives" :key="incentive.name" class="text-center sm:flex sm:text-left lg:block lg:text-center rounded-md shadow px-12 py-20 bg-white">
            <div class="sm:flex-shrink-0">
                <div class="flow-root">
                <img class="w-28 h-24 mx-auto" :src="incentive.imageSrc" alt="" />
                </div>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 class="text-sm font-medium text-gray-900">
                {{ incentive.name }}
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                {{ incentive.description }}
                </p>
            </div>
        </div>
      </div>
    </div>
      <div class="absolute inset-0 flex flex-col -z-10" aria-hidden="true">
          <div class="flex-1 w-full bg-dpbm-blue" />
          <div class="flex-1 bg-gray-50" />
        </div>
  </div>
</template>


<script>
    const incentives = [
    {
        name: 'Open Source',
        description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
    },
    {
        name: 'Ehrenamtlich',
        description: 'Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.',
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
    },
    {
        name: 'Moderne Standards',
        description: "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
    },
    ]

export default {
  name: 'Incentives',
  setup() {
    return {
    incentives,
  }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
