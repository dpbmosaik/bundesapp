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
                      {{ tooltip.scoutName }}
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
            @nextStep="nextStep"
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
import PrevNextButtons from "../../../components/button/PrevNextButtonsSteps.vue";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
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
    },
    tooltip: {
      scoutName: "Gib hier bitte deinen Namen oder deinen Fahrtennamen ein.",
      email:
        "Die E-Mail nutzen wir für die Kommunikation mit dem Tool und für Rückfragen.",
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
        maxLength: maxLength(24),
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z-]*$/);
          return regex.test(value);
        },
      },
      lastname: {
        required,
        maxLength: maxLength(24),
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z-]*$/);
          return regex.test(value);
        },
      },
      scoutname: {
        maxLength: maxLength(12),
        minLength: minLength(2),
        alphaCustom: (value) => {
          const regex = new RegExp(/^[a-zA-Z0-9-äöüß]*$/);
          return regex.test(value);
        },
      },
      email: { required, email },
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData", "username"]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.initialData.firstname.$dirty) return errors;
      if (
        !this.$v.initialData.firstname.required ||
        !this.$v.initialData.firstname.alphaCustom
      ) {
        errors.push("Es muss ein valider Vorname eingegeben werden.");
      }
      if (!this.$v.initialData.firstname.maxLength) {
        errors.push("Der Vorname darf nicht länger als 24 Zeichen sein.");
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
      if (!this.$v.initialData.lastname.maxLength) {
        errors.push("Der Nachname darf nicht länger als 24 Zeichen sein.");
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
      if (
        !this.$v.initialData.scoutname.maxLength ||
        !this.$v.initialData.scoutname.minLength
      ) {
        errors.push(
          "Der Fahrtenname muss zwischen 2 und 12 Zeichen lang sein."
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
    mounted() {
      this.setUsername();
      return null;
    },
  },
  methods: {
    setUsername() {
      console.log("scoutname" + this.initialData.scoutname)
      this.$store.commit('setUsername', this.initialData.scoutname);
      this.$emit("nextStep");
    },
    getData() {
      return this.initialData;
    },
  },
};
</script>
