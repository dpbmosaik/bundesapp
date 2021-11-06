<template>
  <div>
    <h1>Account erstellen</h1>
    <v-stepper v-model="currentStep" vertical>
      <template v-for="(step, index) in steps">
        <v-stepper-step
          :key="`stepper-${index}`"
          :complete="currentStep > index + 1"
          :step="index + 1"
        >
          {{ `${step.displayName}` }}
        </v-stepper-step>

        <v-divider :key="index"></v-divider>

        <v-stepper-items :key="`stepper-items-${index}`">
          <v-stepper-content :step="index + 1">
            <component
              :is="step"
              :ref="step.name"
              :position="index + 1"
              :max-pos="steps.length"
              :currentRegistration="currentRegistration"
              :scoutOrganisation="scoutOrganisation"
              :currentEvent="currentEvent"
              @prevStep="prevStep()"
              @nextStep="nextStep()"
              @submit="onRegistrationConfirmed()"
            />
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>

  </div>
</template>

<script>
import InitalDataStep from "./initalDataStep.vue";
import GroupStep from "./groupStep.vue";
export default {
  components: {
    InitalDataStep,
    GroupStep,
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    steps() {
      return [InitalDataStep, GroupStep];
    },
  },
  methods: {
    nextStep() {
      this.currentStep += 1;
      this.callOnBeforeTab(this.currentStep - 1);
    },
    prevStep() {
      this.currentStep -= 1;
      this.callOnBeforeTab(this.currentStep - 1);
    },
  },
};
</script>

<style>
</style>