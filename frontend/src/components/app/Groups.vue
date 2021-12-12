<template>
  <div div class="flex-1 relative z-0 flex overflow-hidden">
    <main
      class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
    >
      <!-- Start main area-->
      <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
        <div class="h-full border-2 border-gray-200 border-dashed rounded-lg" />
      </div>
      <!-- End main area -->
    </main>

    <aside
      class="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto"
    >
      <!-- Start secondary column (hidden on smaller screens) -->
      <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
        <div class="h-full border-2 border-gray-200 border-dashed rounded-lg" />
      </div>
      <!-- End secondary column -->
    </aside>
  </div>
</template>

<script>
export default {
  name: "GroupsName",
};
</script>