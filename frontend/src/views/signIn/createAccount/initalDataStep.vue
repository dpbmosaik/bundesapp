<template>
  <v-card max-width="75%">
    <v-form ref="formNameDescription" v-model="valid">
      <v-container>
        <v-form v-model="valid">
          <v-subheader> Namen </v-subheader>
          <v-row>
            <v-col align-self>
              <v-text-field
                v-model="initialData.firstname"
                :counter="20"
                :error-messages="firstNameErrors"
                label="Vorname"
                required
                prepend-icon="mdi-card-account-details-outline"
                @input="$v.initialData.firstname.$touch()"
                @blur="$v.initialData.firstname.$touch()"
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
                        "Trage bitte den Vornamen des_der Teilnehmer_in " +
                        "ein. Zweitnamen müssen nicht mit angegeben werden."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self>
              <v-text-field
                v-model="initialData.lastname"
                :counter="20"
                :error-messages="lastNameErrors"
                label="Nachname"
                required
                prepend-icon="mdi-card-account-details-outline"
                @input="$v.initialData.lastname.$touch()"
                @blur="$v.initialData.lastname.$touch()"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="success" dark v-bind="attrs" v-on="on">
                        mdi-help-circle-outline
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
          <v-row>
            <v-col align-self>
              <v-text-field
                v-model="initialData.scoutname"
                autofocus
                :counter="20"
                :error-messages="scoutNameErrors"
                label="Fahrtenname (optional)"
                required
                prepend-icon="mdi-campfire"
                @input="$v.initialData.scoutname.$touch()"
                @blur="$v.initialData.scoutname.$touch()"
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
                        "Trage bitte den Fahrtennamen " +
                        "des_der Teilnehmer_in ein."
                      }}
                    </span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormattedMomentjs"
                    label="Geburtstag"
                    prepend-icon="mdi-calendar"
                    :error-messages="birthdayErrors"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="initialData.birthday"
                  :active-picker.sync="activePicker"
                  :max="
                    new Date(
                      new Date('2021-12-24T03:24:00') -
                        new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self>
              <v-select
                v-model="initialData.group"
                :items="data.groups"
                :error-messages="ageGroupsErrors"
                item-text="name"
                prepend-icon="mdi-account-group"
                item-value="id"
                label="Gruppe"
                required
                @input="validate()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self>
              <v-select
                v-model="initialData.gender"
                :items="data.genders"
                :error-messages="genderErrors"
                item-text="label"
                prepend-icon="mdi-account-group"
                item-value="id"
                label="Geschlecht"
                required
                @input="validate()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self>
              <v-text-field
                v-model="initialData.email"
                label="E-Mail Adresse*"
                prepend-icon="mdi-email"
              >
                <template slot="append">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="success" dark v-bind="attrs" v-on="on">
                        mdi-help-circle-outline
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
          <v-divider />
          <v-divider class="my-3" />
          <prev-next-buttons
        :position="position"
        :max-pos="maxPos"
        @nextStep="nextStep()"
        @prevStep="prevStep"
        @submitStep="submitStep()"
      />
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
    prevStep() {
      this.$emit('prevStep');
    },
    nextStep() {
      this.validate();
      if (!this.valid) {
        return;
      }
      this.$emit('nextStep');
    },
  },
};
</script>
