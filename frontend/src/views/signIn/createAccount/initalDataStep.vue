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
                v-model="initialData.firstname"
                :error-messages="firstNameErrors"
                label="Vorname"
                required
                @input="$v.initialData.firstname.$touch()"
                @blur="$v.initialData.firstname.$touch()"
              >
                <!-- <tooltip
                  :text="'Trage bitte den Vornamen des_der Teilnehmer_in ' +
                        'ein. Zweitnamen müssen nicht mit angegeben werden.'"
                /> -->
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{
                        "Trage bitte den Vornamen des_der Teilnehmer_in " +
                        "ein. Zweitnamen müssen nicht mit angegeben werden."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.lastname"
                :error-messages="lastNameErrors"
                label="Nachname"
                required
                @input="$v.initialData.lastname.$touch()"
                @blur="$v.initialData.lastname.$touch()"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{ "Trage bitte den vollständigen Nachnamen ein." }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.scoutname"
                autofocus
                :error-messages="scoutNameErrors"
                label="Fahrtenname (optional)"
                required
                @input="$v.initialData.scoutname.$touch()"
                @blur="$v.initialData.scoutname.$touch()"
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
                        "Trage bitte den Fahrtennamen " +
                        "des_der Teilnehmer_in ein."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.email"
                label="E-Mail Adresse*"
                :error-messages="emailErrors"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="grey" dark v-bind="attrs" v-on="on">
                        mdi-alert-circle-outline
                      </v-icon>
                    </template>
                    <span>
                      {{ tooltip.email }}
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
import { required, email } from 'vuelidate/lib/validators';
//import { helpers } from 'vuelidate/lib/validators'
//import Tooltip from "../../../components/tooltip/tooltip.vue"

export default {
  props: ['isOpen', 'position', 'maxPos'],
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
      groups: [{ id: 1, name: "Raubvögel" }],
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
  name: "StepInitalData",
  displayName: "Account",
  validations: {
    initialData: {
      firstname: {
        required,
        alphaCustom: function(value) {
          const regex = new RegExp('/^[a-zA-Z-]*$/');

          console.log(value);
          console.log(regex.test(value));

          debugger; //eslint-disable-line
          return !regex.test(value);
        },
      },
      lastname: {required},
      email: {required, email},
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
    firstNameErrors() {
      const errors = [];
      //const alpha = helpers.regex('alpha', /^[a-zA-Z-]*$/);
      //const alphaAndNumeric = helpers.regex('alphaAndNumeric', /^[a-zA-Z0-9-]*$/);
      if (!this.$v.initialData.firstname.$dirty) return errors;
      if (!this.$v.initialData.firstname.required) {
        errors.push('Es muss ein Vorname eingegeben werden.');
      }
      if (!this.$v.initialData.firstname.alphaCustom) {
        errors.push('Voll Doof.');
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.initialData.lastname.$dirty) return errors;
      if (!this.$v.initialData.lastname.required) {
        errors.push('Es muss ein Nachname eingegeben werden.');
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.initialData.email.$dirty) return errors;
      if (!this.$v.initialData.email.required || !this.$v.initialData.email.email) {
        errors.push('Es muss eine valide Email eingegeben werden.');
      }
      return errors;
    },
  },
  methods: {
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
