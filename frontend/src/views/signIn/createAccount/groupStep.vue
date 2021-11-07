<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card
        justify="center"
        max-width="60%"
        min-width="400"
        class="pa-4"
        flat
      >
        <v-container fluid>
          <v-row class="pa-3">
            <v-col>
              <v-select
                filled
                dense
                v-model="initialData.stamm"
                :error-messages="stammErrors"
                :items="data.staemme"
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
            @ignore="onIngoredClicked"
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
import { stepMixin } from "@/mixins/stepMixin.js";

export default {
  mixins: [stepMixin],
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
      stamm: null,
      group: null,
    },
    data: {
      staemme: [{ id: 1, name: "Raubvögel" }],
      groups: [{ id: 1, name: "Meute Tschil" }],
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
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData", "username"]),
    stammErrors() {
      const errors = [];
      if (!this.$v.initialData.stamm.$dirty) return errors;
      if (!this.$v.initialData.stamm.required) {
        errors.push("Es muss ein Stamm ausgewählt werden.");
      }
      return errors;
    },
    mounted() {
      this.$store.commit('setUsername', this.username+"@"+this.stamm);
      return null
    },
  },
  methods: {
    getData() {
      return this.initialData;
    },
    getStaemme() {
      axios
        .get(`${this.API_URL}/auth/scout-hierarchy/`)
        .then((response) => {
          this.data.staemme = response.data;
        })
        .catch(() => {
          this.showError = true;
          console.log("Fehler");
        });
    },
    beforeTabShow() {
      this.getStaemme();
    },
  },
};
</script>
