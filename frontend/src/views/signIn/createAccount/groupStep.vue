<template>
  <v-card max-width="75%">
    <v-form ref="formNameDescription" v-model="valid">
      <v-container>
        <v-form v-model="valid">
          <v-divider />
          <v-subheader> Adresse / Telefon </v-subheader>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="initialData.street"
                :counter="40"
                :error-messages="streetErrors"
                label="Straße und Hausnummer"
                prepend-icon="mdi-home"
                required
                @input="$v.data.street.$touch()"
                @blur="$v.data.street.$touch()"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="success" dark v-bind="attrs" v-on="on">
                        mdi-help-circle-outline
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
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                v-model="initialData.zipcode"
                :items="zipCodeResponse"
                :item-text="customText"
                required
                :error-messages="zipCodeErrors"
                item-value="id"
                label="Stadt / Postleitzahl"
                placeholder="Wähle Stadt oder Postleitzahl."
                prepend-icon="mdi-city"
                :loading="isZipLoading"
                :search-input.sync="search"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="success" dark v-bind="attrs" v-on="on">
                        mdi-help-circle-outline
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
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="initialData.additionalAddress"
                label="Adresszusatz"
                prepend-icon="mdi-home"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="initialData.phone"
                :counter="30"
                :error-messages="phoneNumberErrors"
                label="Telefonnummer"
                prepend-icon="mdi-phone"
                required
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="success" dark v-bind="attrs" v-on="on">
                        mdi-help-circle-outline
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
          <v-divider />
          <v-divider class="my-3" />
          <v-btn color="primary" @click="onClickOkay"> Weiter </v-btn>
        </v-form>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  props: ["isOpen"],
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
    showError: false,
    showSuccess: false,
    timeout: 7000,
  }),
  name: "StepInitalData",
  displayName: "Account",
  components: {},
  validations: {},
  computed: {
    ...mapGetters(["isAuthenticated", "getJwtData"]),
  },
  methods: {
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
      this.onRefresh();
    },
  },
};
</script>