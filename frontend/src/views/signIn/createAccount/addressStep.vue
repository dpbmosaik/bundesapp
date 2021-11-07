<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card
        fluid
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
                v-model="initialData.street"
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
                        "des Wohnorts ein und wähle die richtige Option aus. " +
                        "Gebe mindestens 3 Zahlen oder Buchstaben ein."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field filled dense label="Adresszusatz"> </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-3">
            <v-col>
              <v-text-field
                filled
                v-model="initialData.phoneNumber"
                dense
                :error-messages="phoneNumberErrors"
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
                      {{ tooltip.phone }}
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
import { mapGetters } from "vuex";
import axios from "axios";
import {
  integer,
  minValue,
} from 'vuelidate/lib/validators';
import PrevNextButtons from "../../../components/button/PrevNextButtonsSteps.vue";
import { stepMixin } from "@/mixins/stepMixin.js";

const phoneNumStartValidator = (number) => {
  if (!number) return true;
  return number.startsWith('0');
};


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
    search: null,
    initialData: {
      phoneNumber: null,
    },
    showError: false,
    showSuccess: false,
    timeout: 7000,
    tooltip: {
      phone:
        "Die Handynummer ist freiwillig und hilft dich zu kontaktieren (Für manche Fahrten ist sie Pflicht)",
    },
  }),
  name: "AddressStep",
  displayName: "Adresse / Nummer",
  validations: {
    initialData: {
      phoneNumber: {
        integer,
        minValue: minValue(1),
        phoneNumStartValidator,
      },
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),

    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.initialData.phoneNumber.$dirty) return errors;
      if (
        !this.$v.initialData.phoneNumber.integer || // eslint-disable-line
        !this.$v.initialData.phoneNumber.minValue // eslint-disable-line
      ) {
        errors.push('Telefonnummer darf nur aus Zahlen bestehen.'); // eslint-disable-line
      }
      if (!this.$v.initialData.phoneNumber.phoneNumStartValidator) {
        errors.push('Die Telefonnummer muss mit 0 beginnen.');
      }
      return errors;
    },
  },
  watch: {
    search(searchString) {
      // still loading
      if (this.isZipLoading) return;

      if (!searchString) return;

      if (searchString.indexOf(" ") >= 0) return;

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
    getData() {
      return this.initialData;
    },
    customText: (item) => `${item.zipCode} — ${item.city}`,
    async getZipCodeMapping(searchString) {
      const path = `${this.API_URL}/auth/zip-code/?zip_city=${searchString}`;
      const response = await axios.get(path);

      return response.data;
    },
  },
};
</script>