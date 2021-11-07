<template>
  <div>
    <v-stepper v-model="currentStep">
      <v-stepper-header editable>
        <template v-for="(step2, index2) in steps">
          <template>
            <v-stepper-step editable :key="`key1-${index2}`" :step="index2 + 1">
              {{ step2.displayName }}
            </v-stepper-step>
            <v-divider :key="index2"></v-divider>
          </template>
        </template>
      </v-stepper-header>
      <template v-for="(step, index) in steps">
        <v-divider :key="index"></v-divider>

        <v-stepper-items :key="`stepper-items-${index}`">
          <v-stepper-content :step="index + 1">
            <component
              :is="step"
              :ref="step.name"
              :position="index + 1"
              :max-pos="steps.length"
              @prevStep="prevStep()"
              @nextStep="nextStep()"
              @submit="getData()"
              @ignore="onIngoredClicked()"
            />
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import InitialDataStep from "./initalDataStep.vue";
import AddressStep from "./addressStep.vue";
import GroupStep from "./groupStep.vue";
import BirthAndGender from "./birthAndGender.vue";
import axios from "axios";
import LoginAndPassword from "./loginAndPassword.vue";

export default {
  components: {
    InitialDataStep,
    GroupStep,
    AddressStep,
    BirthAndGender,
    LoginAndPassword,
  },
  data: () => ({
    currentStep: 1,
    API_URL: process.env.VUE_APP_API,
  }),
  computed: {
    steps() {
      return [
        InitialDataStep,
        GroupStep,
        BirthAndGender,
        AddressStep,
        LoginAndPassword,
      ];
    },
  },
  methods: {
    onRegistrationConfirmed() {},
    nextStep() {
      this.currentStep += 1;
      this.callOnBeforeTab(this.currentStep - 1);
    },
    prevStep() {
      this.currentStep -= 1;
      this.callOnBeforeTab(this.currentStep - 1);
    },
    callOnBeforeTab(step) {
      const nextStepName = this.steps[step].name;
      if (
        this.$refs[nextStepName] &&
        this.$refs[nextStepName].length &&
        this.$refs[nextStepName][0].beforeTabShow
      ) {
        this.$refs[nextStepName][0].beforeTabShow();
      }
    },
    send(allData) {
      axios
        .post(`${this.API_URL}auth/register/`, allData)
        .then((response) => {
          this.$router.push({
            name: "registrationCreate",
            content: response,
          });
        })
        .catch(() => {
          this.showError = true;
          console.log("Fehler");
        });
    },
    getData() {
      let initialData = this.$refs.InitialDataStep[0].getData();
      let groupData = this.$refs.GroupStep[0].getData();
      let birthAndGenderData = this.$refs.BirthAndGender[0].getData();
      let addressData = this.$refs.AddressStep[0].getData();

      let allData = {
        firstname: initialData.firstname,
        lastname: initialData.lastname,
        scoutname: initialData.scoutname,
        mail: initialData.email,
        stamm: groupData.stamm,
        group: groupData.group,
        birthdate: birthAndGenderData.birthdate,
        gender: birthAndGenderData.gender,
        address: addressData.address,
        street: addressData.street,
        additionalAddress: addressData.additionalAddress,
        phone: addressData.phone,
        username: initialData.firstname + initialData.scoutname,
        password: "start123",
      };
      this.send(allData);
    },
  },
};
</script>

<style>
</style>