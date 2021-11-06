<template>
  <div>
    <v-stepper v-model="currentStep">
      <template v-for="(step, index) in steps">
        <v-stepper-step
          alt-labels
          class="mt-12"
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
import AddressStep from "./addressStep.vue";
import GroupStep from "./groupStep.vue";
import BirthAndGender from "./birthAndGender.vue";

export default {
  components: {
    InitalDataStep,
    GroupStep,
    AddressStep,
    BirthAndGender,
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    steps() {
      return [InitalDataStep, GroupStep, BirthAndGender, AddressStep];
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
    submitStep() {
      this.validate();
      if (!this.valid) {
        return;
      }
      this.$emit('submit');
    },
  },
};
</script>

<style>
</style>