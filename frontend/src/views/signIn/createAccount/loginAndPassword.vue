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
                v-model="initialData.username"
                label="Anzeigename"
                required
                @input="$v.initialData.username.$touch()"
                @blur="$v.initialData.username.$touch()"
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
                        "Dies ist deine ID, "+
                        "sie wird automatisch aus deinen Angaben erzeugt."
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
                v-model="initialData.password"
                :error-messages="passwordErrors"
                label="Passwort*"
                required
                @input="$v.initialData.password.$touch()"
                @blur="$v.initialData.password.$touch()"
                :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
                
                :type="showPW ? 'text' : 'password'"
                name="input-10-2"
                hint="At least 8 characters"
                value="wqfasds"
                class="input-group--focused"
                @click:append="showPW = !showPW"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                dense
                v-model="initialData.passwordB"
                autofocus
                :error-messages="passwordBErrors"
                label="Passwort bestätigen*"
                required
                @input="$v.initialData.passwordB.$touch()"
                @blur="$v.initialData.passwordB.$touch()"
                :append-icon="showPWB? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPWB ? 'text' : 'password'"
                name="input-10-2"
                hint="At least 8 characters"
                value="Pa"
                class="input-group--focused"
                @click:append="showPWB = !showPWB"
              > 
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
import {required, sameAs, minLength} from 'vuelidate/lib/validators';
import axios from "axios";
import PrevNextButtons from "../../../components/button/PrevNextButtonsSteps.vue";
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
      password: null,
      passwordB: null,
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
        showPW: false,
        showPWB: false,
        password: 'Password',
        /* rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        } */
    showError: false,
    showSuccess: false,
    timeout: 7000,
  }),
  name: "StepInitalData",
  displayName: "Account",
  validations: {
    initialData:{
      password:{
        required,
        minLength:minLength(8),
      },
      passwordB:{
        sameAsPassword:sameAs('password')
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
    passwordErrors() {
      const errors = [];
      if (!this.$v.initialData.password.$dirty) return errors;
      if (!this.$v.initialData.password.required) {
        errors.push("Passwort ist erforderlich.");
      }
      if (!this.$v.initialData.password.minLength) {
        errors.push("Das Passwort muss mindestens 8 Zeichen lang sein.");
      }
      return errors;
    },
    passwordBErrors() {
      const errors = [];
      if (!this.$v.initialData.passwordB.$dirty) return errors;
      if (!this.$v.initialData.passwordB.sameAsPassword) {
        errors.push("Die Passwörter sitmmen nicht über ein");
      }
      return errors;
    },
  },
  methods: {
    validate() {
      this.$v.$touch();
      this.valid = !this.$v.$error;
    },
    changeEye(){

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
