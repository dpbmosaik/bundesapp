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
              @ignore="onIngoredClicked"
          />
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
import { mapGetters } from "vuex";
import PrevNextButtons from "../../../components/button/PrevNextButtonsSteps.vue";
import { required, email } from "vuelidate/lib/validators";
//import { helpers } from 'vuelidate/lib/validators'
//import Tooltip from "../../../components/tooltip/tooltip.vue"
import { stepMixin } from "@/mixins/stepMixin.js";

export default {
  displayName: 'Persönliches',
  props: ["isOpen", "position", "maxPos"],
  components: { PrevNextButtons },
  mixins: [stepMixin],
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
  name: "InitialDataStep",
  validations: {
    initialData: {
      firstname: {
        required,
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z-]*$/);
          return regex.test(value);
        },
      },
      lastname: {
        required,
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z-]*$/);
          return regex.test(value);
        },
      },
      scoutname: {
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z0-9-äöüß]*$/);
          return regex.test(value);
        },
      },
      email: { required, email },
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
    firstNameErrors() {
      const errors = [];
      //const alpha = helpers.regex('alpha', /^[a-zA-Z-]*$/);
      //const alphaAndNumeric = helpers.regex('alphaAndNumeric', /^[a-zA-Z0-9-]*$/);
      if (!this.$v.initialData.firstname.$dirty) return errors;
      if (
        !this.$v.initialData.firstname.required ||
        !this.$v.initialData.firstname.alphaCustom
      ) {
        errors.push("Es muss ein valider Vorname eingegeben werden.");
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.initialData.lastname.$dirty) return errors;
      if (
        !this.$v.initialData.lastname.required ||
        !this.$v.initialData.lastname.alphaCustom
      ) {
        errors.push("Es muss ein valider Nachname eingegeben werden.");
      }
      return errors;
    },
    scoutNameErrors() {
      const errors = [];
      if (!this.$v.initialData.scoutname.$dirty) return errors;
      if (!this.$v.initialData.scoutname.alphaCustom) {
        errors.push(
          "Es muss ein valider Fahrtenname (ohne Sonderzeichen) eingegeben werden."
        );
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.initialData.email.$dirty) return errors;
      if (
        !this.$v.initialData.email.required ||
        !this.$v.initialData.email.email
      ) {
        errors.push("Es muss eine valide Email eingegeben werden.");
      }
      return errors;
    },
  },
  methods: {
    getData() {
      return this.initialData;
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
  },
};
</script>
