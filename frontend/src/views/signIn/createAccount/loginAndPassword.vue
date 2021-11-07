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
      username: "",
      password: null,
      passwordB: null,
    },
    data: {
      valid: true,
      isLoading: true,
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
  name: "LoginAndPassword",
  displayName: "Passwort",
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
    ...mapGetters(["isAuthenticated", "getJwtData", "username"]),
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
    submitStep() {
      this.$emit("submit");
    },
    getData() {
      return this.initialData;
    },
    beforeTabShow() {
      //console.log(this.username);
    }
  },
};
</script>
