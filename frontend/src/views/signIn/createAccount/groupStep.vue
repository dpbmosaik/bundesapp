<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card
        outlined
        elevation="3"
        fluid
        justify="center"
        max-width="60%"
        min-width="400"
        class="pa-4"
      >
        <v-container fluid>
          <v-row justify="center">
            <h2 class="ma-4">Account erstellen</h2>
            <p class="ma-2" style="color: #b8bcca">
              Die Bundesapp ist ein Service des Deutschen Pfafinderbundes Mosaik
            </p>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-select
                filled
                dense
                v-model="initialData.stamm"
                :error-messages="stammErrors"
                :items="data.stamm"
                item-text="name"
                item-value="id"
                label="Stammesname"
                required
                @input="validate()"
              />
            </v-col>
          </v-row>
          <v-row class="pa-3" v-if="this.initialData.stamm != null">
            <v-col>
              <v-select
                filled
                dense
                v-model="initialData.group"
                :items="data.groups"
                item-text="name"
                item-value="id"
                label="Gruppe"
                required
                @input="validate()"
              />
            </v-col>
          </v-row>
          <prev-next-buttons
            :position="position"
            :max-pos="maxPos"
            @nextStep="nextStep()"
            @prevStep="prevStep"
            @submitStep="submitStep()"
          />
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import PrevNextButtons from "../../../components/button/PrevNextButtonsSteps.vue";
import { required } from "vuelidate/lib/validators";
//import Tooltip from "../../../components/tooltip/tooltip.vue"

export default {
  props: ["isOpen", "position", "maxPos"],
  components: { PrevNextButtons },
  data: () => ({
    API_URL: process.env.VUE_APP_API,
    active: false,
    valid: true,
    isLoading: true,
    isZipLoading: false,
    zipCodeResponse: [],
    initialData: {
      firstname: null,
      lastname: null,
      scoutname: null,
      mail: null,
      stamm: null,
      group: null,
      username: null,
      birthdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      gender: null,
      address: null,
      zipcode: null,
      city: null,
      additionalAddress: null,
      phone: null,
    },
    data: {
      stamm: [{ id: 1, name: "Raubvögel" }],
      groups: [{ id: 1, name: "Meute Tschil" }],
      genders: [
        { id: 1, label: "weiblich" },
        { id: 2, label: "männlich" },
        { id: 3, label: "non-binär" },
      ],
      valid: true,
      isLoading: true,
    },
    tooltip: {
      scoutName: "Gib hier bitte deinen Namen oder deinen Fahrtennamen ein.",
      email:
        "Die E-Mail nutzen wir für die Kommunikation mit dem Tool und für Rückfragen.",
      mobileNumber:
        "Die Handynummer ist freiwillig und hilft dich zu kontaktieren (Für manche Fahrten ist sie Pflicht)",
    },
    showError: false,
    showSuccess: false,
    timeout: 7000,
  }),
  name: "GroupStep",
  displayName: "Stamm / Gruppe",
  validations: {
    initialData: {
      stamm: { required },
      group: { required },
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
    stammErrors() {
      const errors = [];
      if (!this.$v.initialData.stamm.$dirty) return errors;
      if (!this.$v.initialData.stamm.required) {
        errors.push("Es muss ein Stamm ausgewählt werden.");
      }
      return errors;
    },
  },
  methods: {
    getData() {
      return this.initialData;
    },
    validate() {
      this.$v.$touch();
      this.valid = !this.$v.$error;
    },
    send() {
      axios
        .post(
          `${this.API_URL}basic/registration/?code=${this.getCodeParam}`,
          this.initialData
        )
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
    prevStep() {
      this.$emit("prevStep");
    },
    nextStep() {
      this.validate();
      if (!this.valid) {
        return;
      }
      this.$emit("nextStep");
    },
  },
};
</script>
