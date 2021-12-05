<template>
  <!-- The basic structure for the Card design -->
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <!-- <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{title}}</h2>
        <p class="mt-2 text-center text-sm text-gray-600">{{subTitle}}</p> -->

        <!-- The HTML will be injected here -->
        <slot></slot>

        <!-- Navigation Buttons -->
        <div class="flex flex-row py-2" :class="isFirst() ? 'justify-end' : 'justify-between'">
          <button @click="navigatePrevious" v-show="!isFirst()">
            Zurück
          </button>

          <button @click="navigateNext">
            {{ nextButtonText() }}
          </button>
        </div>

        <!-- The Progessbar -->
          <nav aria-label="Progress">
            <ol role="list" class="flex items-center justify-between">
              <li v-for="(step, stepIdx) in steps" :key="step.name" :class="[stepIdx !== steps.length - 1 ? 'flex-1' : '', 'relative']">
                
                <template v-if="step.status === 'complete'">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-indigo-600" />
                  </div>
                  <button @click="navigateToStep(stepIdx + 1)" class="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900">
                    <CheckIcon class="w-5 h-5 text-white" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                  </button>
                </template>

                <template v-else-if="step.status === 'current'">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-gray-200" />
                  </div>
                  <button @click="navigateToStep(stepIdx + 1)" class="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full" aria-current="step">
                    <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                  </button>
                </template>

                <template v-else>
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div class="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400">
                    <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                  </div>
                </template>

              </li>
            </ol>
          </nav>   
        
      </div>
  </div>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/solid'

const steps = [
  { name: 'Step 1', href: '#', status: 'current', step: 1 },
  { name: 'Step 2', href: '#', status: 'upcoming', step: 2 },
  { name: 'Step 3', href: '#', status: 'upcoming', step: 3 },
  { name: 'Step 4', href: '#', status: 'upcoming', step: 4 },
  { name: 'Step 5', href: '#', status: 'upcoming', step: 5 },
  { name: 'Step 6', href: '#', status: 'upcoming', step: 6 },
]

export default {
  name: "CardTemplate",
  methods: {
    nextButtonText() {
      if (
        this.$route.name === 'Register6'
      ) {
        return 'Abschicken'
      }

      return 'Weiter'
    },
    isFirst() {
      return this.$route.name === 'Register1'
    },
    navigateNext() {
      const currentRoute = this.$route.path;
      let registerStep = currentRoute.charAt(currentRoute.length-1)

      this.$router.push({path: '/register/' + (++registerStep)})
      this.updateStepper()
    },
    navigatePrevious() {
      const currentRoute = this.$route.path;
      let registerStep = currentRoute.charAt(currentRoute.length-1)

      this.$router.push({path: '/register/' + (--registerStep)})
    },
    navigateToStep(step) {
      this.$router.push({path: '/register/' + (step)})
    },
    updateStepper() {
      const currentRoute = this.$route.path;
      let registerStep = currentRoute.charAt(currentRoute.length-1)

      const currentActiveStep = steps.find(obj => obj.status == 'current');
      const arrayIndex = steps.indexOf(currentActiveStep);
      if (arrayIndex + 1 == registerStep) {
        steps[arrayIndex + 1].status = 'current';
        steps[arrayIndex].status = 'complete';
      }
    }
  },
  computed: {

  },
  setup() {
    return {
      steps
    }
  },
  components: {
    CheckIcon,
    
  }
}
</script>