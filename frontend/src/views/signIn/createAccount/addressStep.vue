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
              <v-text-field
                filled
                dense
                v-model="initialData.street"
                :error-messages="streetErrors"
                label="Straße und Hausnummer"
                required
                @input="$v.data.street.$touch()"
                @blur="$v.data.street.$touch()"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{ "Trage bitte Straße und Hausnummer ein." }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-autocomplete
                filled
                dense
                v-model="initialData.zipcode"
                :items="zipCodeResponse"
                :item-text="customText"
                required
                :error-messages="zipCodeErrors"
                item-value="id"
                label="Stadt / Postleitzahl"
                placeholder="Wähle Stadt oder Postleitzahl."
                :loading="isZipLoading"
                :search-input.sync="search"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{
                        "Trage bitte den Wohnort oder die Postleitzahl " +
                        "des Wohnorts ein und wähle die richtige Option aus."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.additionalAddress"
                label="Adresszusatz"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.phone"
                :error-messages="phoneErrors"
                label="Telefonnummer"
                required
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{
                        "Trage bitte eine Mobil- oder Festnetznummer " +
                        "ein unter der der_die Teilnehmer_in oder die " +
                        "Erziehungsberechtigten nach " +
                        "der Fahrt erreichbar sind."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
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
import { required, integer } from "vuelidate/lib/validators";

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
    search: null,
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
      groups: [{ id: 1, name: "Raubvögel" }],
      genders: [
        { id: 1, label: "weiblich" },
        { id: 2, label: "männlich" },
        { id: 3, label: "non-binär" },
      ],
      valid: true,
      isLoading: true,
    },
    showError: false,
    showSuccess: false,
    timeout: 7000,
  }),
  name: "StepInitalData",
  displayName: "Account",
  validations: {
    initialData: {
      phone: {
        required,
        minValue: 5,
        integer,
        phoneNumStartValidator: (value) => {
          const regex = new RegExp(/^0[0-9]*/);
          return regex.test(value);
        },
      },
      street: {
        required,
        minLength: 5,
        maxLength: 20,
      },
      zipcode: {
        required,
        minLength: 4,
      },
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
    phoneErrors() {
      const errors = [];
      if (!this.$v.initialData.phone.$dirty) return errors;
      if (!this.$v.initialData.phone.required) {
        errors.push("Telefonnummer ist erforderlich.");
      }
      if (
        !this.$v.initialData.phone.integer || // eslint-disable-line
        !this.$v.initialData.phone.minValue // eslint-disable-line
      ) {
        errors.push("Telefonnummer darf nur aus Zahlen bestehen."); // eslint-disable-line
      }
      if (!this.$v.initialData.phone.phoneNumStartValidator) {
        errors.push("Die Telefonnummer muss mit 0 beginnen.");
      }
      return errors;
    },
    streetErrors() {
      const errors = [];
      if (!this.$v.initialData.street.$dirty) return errors;
      if (!this.$v.initialData.street.required) {
        errors.push("Adresse ist erforderlich.");
      }
      if (!this.$v.initialData.street.minLength) {
        errors.push("Adresse muss mindestens 5 Zeichen lang sein.");
      }
      if (!this.$v.initialData.street.maxLength) {
        errors.push("Adresse darf maximal 30 Zeichen lang sein.");
      }
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.initialData.zipcode.$dirty) return errors;
      if (!this.$v.initialData.zipcode.minLength) {
        errors.push("Stadt ist erforderlich.");
      }
      if (!this.$v.initialData.zipcode.required) {
        errors.push("Stadt ist erforderlich.");
      }
      return errors;
    },
  },
  watch: {
    search(searchString) {
      // still loading
      if (this.isZipLoading) return;

      if (!searchString) return;

      if (searchString.indexOf(' ') >= 0) return;

      if (searchString && searchString.length <= 1) return;

      this.isZipLoading = true;

      this.getZipCodeMapping(searchString)
        .then((res) => {
          this.zipCodeResponse = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isZipLoading = false;
        });
    },
  },
  methods: {
    customText: (item) => `${item.zipCode} — ${item.city}`,
    validate() {
      this.$v.$touch();
      this.valid = !this.$v.$error;
    },
    submitStep() {
      this.validate();
      if (!this.valid) {
        return;
      }
      this.$emit("submit");
    },
    async getZipCodeMapping(searchString) {
      const path = `${this.API_URL}auth/zip-code/?zip_city=${searchString}`;
      const response = await axios.get(path);

      return response.data;
    },
    getSingleZipCode(zipCode) {
      this.callSingleZipCode(zipCode)
        .then((res) => {
          this.zipCodeResponse = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isZipLoading = false;
        });
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
    beforeTabShow() {
      this.getSingleZipCode(this.data.zipCode);
      this.onRefresh();
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