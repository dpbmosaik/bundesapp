<template>
  <div class="p-14 h-screen w-screen">
    <div class="flex flex-row w-full justify-center">
      <div class="bg-proto-grey rounded-lg px-4 py-2">Bundesapp Logo</div>
      <!-- <h1 class="self-center">Bundesapp des DPBM</h1> -->
    </div>

    <div class="flex justify-center items-center content-center w-full h-full">
      <div class="border border-proto-grey rounded-2xl p-10 w-2/5 flex flex-col gap-8">

        <div v-if="currentStep === 1" class="flex flex-col gap-4">
           <h2 class="font-h1">
              Account erstellen
          </h2>
          <TextInput v-model="firstName" label="Vorname" required type="text" placeholder="Clara" :value="firstName" @error-update="handleErrorUpdate" />
          <TextInput v-model="lastName" label="Nachname" required type="text" placeholder="Müller" :value="lastName" @error-update="handleErrorUpdate" />
          <TextInput v-model="fahrtenName" label="Fahrtenname" type="text" placeholder="Schlumpf" :value="fahrtenName" @error-update="handleErrorUpdate" />
          <TextInput v-model="email" label="E-Mail" required type="email" placeholder="clara@müller.de" :value="email" @error-update="handleErrorUpdate" />
        </div>
        <div v-else-if="currentStep === 2" class="flex flex-col gap-4">
          <h2 class="font-h1">
              Stamm auswählen
          </h2>
          <DropdownInput v-model="stamm" :options="stammesList" label="Stamm" required @error-update="handleErrorUpdate" />
          <DropdownInput v-show="stamm.length" v-model="stammesGroup" :options="stammesGroupList" label="Gruppe" required @error-update="handleErrorUpdate" />
        </div>
        <div v-else-if="currentStep === 3" class="flex flex-col gap-4">
          <h2 class="font-h1">
            Persönliche Daten
          </h2>
          <TextInput v-model="birthDate" label="Geburtsdatum" required type="date" placeholder="yyyy-mm-dd" :value="birthDate" @error-update="handleErrorUpdate" />
          <DropdownInput v-model="gender" :options="genderOptionsList" label="Geschlecht" required @error-update="handleErrorUpdate" />
        </div>
        <div v-else-if="currentStep === 4" class="flex flex-col gap-4">
          <h2 class="font-h1">
            Kontaktdaten
          </h2>
          <TextInput v-model="streetName" label="Straße" required type="text" placeholder="Musterstraße" :value="streetName" @error-update="handleErrorUpdate" />
          <TextInput v-model="streetNumber" label="Hausnummer" required type="text" placeholder="48" :value="streetNumber" @error-update="handleErrorUpdate" />
          <TextInput v-model="cityName" label="Stadt" required type="text" placeholder="Köln" :value="cityName" @error-update="handleErrorUpdate" />
          <TextInput v-model="cityCode" label="PLZ" required type="number" placeholder="12345" :value="cityCode" @error-update="handleErrorUpdate" />
          <TextInput v-model="addressAddition" label="Addresszusatz" type="text" placeholder="c/o Bauer" :value="addressAddition" @error-update="handleErrorUpdate" />
          <TextInput v-model="phoneNumber" label="Telefonnummer" required type="text" placeholder="+49 123 456789" :value="phoneNumber" @error-update="handleErrorUpdate" />
        </div>
        <div v-else-if="currentStep === 5" class="flex flex-col gap-4">
          <h2 class="font-h1">
            Passwort auswählen
          </h2>
          <!-- <p>{{ `Dein Anzeigename für zusätzliche Anwendunge wird sein: ${firstName.toLowerCase()}.${lastName.toLowerCase()}` }}</p> -->
          <TextInput v-model="password" label="Passwort" required type="password" placeholder="Passwort eingeben" :value="password" @error-update="handleErrorUpdate" />
          <TextInput v-model="password2" label="Passwort wiederholen" required type="password" placeholder="Passwort wiederholen" :value="password2" @error-update="handleErrorUpdate" />
          <p v-show="!passwordsAreIdentical" class="mt-2 text-sm text-red-600">Passwörter müssen übereinstimmen</p>
          <p class="font-p">
            Mit meiner Registrierung stimme ich der
            <a href="https://dpbm.de/" target="_blank" rel="noopener" class="font-underlined">Datenschutzerklärung</a>
            zu.
          </p>
        </div>
        <div v-else-if="currentStep === 6" class="flex flex-col gap-4">
          <h2 class="font-h1">
            Vielen Dank für deine Registrierung!
          </h2>
          <p>
            Wir haben dir eine Email geschickt, mit der du deine Email-Adresse bestätigen kannst. Sobald du das getan hast und deine Stammesführung dich ebenfalls besttätigt, kannst du die Bundesapp nutzen!
          </p>
          <PrimaryButton class="self-center" target="/home">Zur Startseite</PrimaryButton>
        </div>

        <!-- Navigation Buttons -->
        <div v-if="currentStep <= 5" class="flex flex-row justify-between">
          <SecondaryButton :target="currentStep === 1 ? cancel() : () => back()" >{{ currentStep === 1 ? 'Abbrechen' : 'Zurück' }}</SecondaryButton>
          <PrimaryButton :target="currentStep === 5 ? () => send() : () => next()" :disabled="validateData">{{ currentStep === 5 ? 'Registrieren' : 'Weiter' }}</PrimaryButton>
        </div>

        <div v-if="currentStep <= 5" class="flex flex-row gap-4 justify-center">
          <button v-for="(step, index) of 5" :key="index" :class="step >= currentStep ? 'cursor-default' : ''" @click="jumpToStep(step)">
            <span
              :class="['h-6 w-6 rounded-full block',
                      step === currentStep ? 'bg-proto-darkgrey' : '', 
                      step < currentStep ? 'bg-proto-grey' : '',
                      step > currentStep ? 'border border-proto-grey' : ''
                      ]"></span>
          </button>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import SecondaryButton from "@/components/button/SecondaryButton.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DropdownInput from "@/components/inputs/DropdownInput.vue";

export default defineComponent({
  name: "RegisterMain",
  components: {
    PrimaryButton,
    SecondaryButton,
    TextInput,
    DropdownInput
  },
  data() {
    const stammesListOptions = [
      {
        value: '',
        text: 'Auswählen...',
        selected: true
      },
      {
        value: 'hellas',
        text: 'Stamm Hellas',
        selected: false
      },
      {
        value: 'zugvoegel',
        text: 'Stamm Zugvögel',
        selected: false
      },
      {
        value: 'sperber',
        text: 'Stamm Sperber',
        selected: false
      },
      {
        value: 'raubvoegel',
        text: 'Stamm Raubvögel',
        selected: false
      },
    ]
    const stammesGroupListOptions = [
      {
        value: '',
        text: 'Auswählen...',
        selected: true
      },
      {
        value: 'pan',
        text: 'Sippe Pan',
        selected: false
      },
      {
        value: 'hades',
        text: 'Sippe Hades',
        selected: false
      },
      {
        value: 'loycanico',
        text: 'Roverrunde Loycanico',
        selected: false
      },
      {
        value: 'zeus',
        text: 'Suppe Zeus',
        selected: false
      },
    ]
    const initialState = {
      firstNameVar: '',
      lastNameVar: '',
      fahrtenNameVar: '',
      emailVar: '',
      streetNameVar: '',
      streetNumberVar: '',
      cityNameVar: '',
      cityCodeVar: '',
      addressAdditionVar: '',
      phoneNumberVar: '',
      genderVar: '',
      birthDateVar: '',
      stammVar: '',
      stammesGroupVar: '',
      passwordVar: '',
      password2Var: ''
    }
    let profileVars = reactive({...initialState}) 
    let currentStep = 1;
    let hasErrors = false;
    let passwordsAreIdenticalVar = true;
    return {
      currentStep,
      profileVars,
      initialState,
      hasErrors,
      stammesListOptions,
      stammesGroupListOptions,
      passwordsAreIdenticalVar
    };
  },
  computed: {
    stammesList() {
      const selectedStamm = this.profileVars.stammVar;
      for (const option of this.stammesListOptions) {
        if (option.value === selectedStamm) {
          option.selected = true
        } else {
          option.selected = false
        }
      }
      return this.stammesListOptions
    },
    stammesGroupList() {
      const selectedStammesGroup = this.profileVars.stammesGroupVar;
      for (const option of this.stammesGroupListOptions) {
        if (option.value === selectedStammesGroup) {
          option.selected = true
        } else {
          option.selected = false
        }
      }
      return this.stammesGroupListOptions
    },
    genderOptionsList() {
      const options = [
        {
          value: '',
          text: 'Auswählen...',
          selected: true
        },
        {
          value: 'diverse',
          text: 'D',
          selected: false
        },
        {
          value: 'female',
          text: 'W',
          selected: false
        },
        {
          value: 'male',
          text: 'M',
          selected: false
        },
      ];
      const selectedGender = this.profileVars.genderVar

      for (const option of options) {
        if (option.value === selectedGender) {
           option.selected = true
        } else {
          option.selected = false
        }
      }
      return options
    },
    validateData() {
      const hasErrors = this.hasErrors;
      switch (this.currentStep) {
        case 1:
          const isFirstNameEmpty = !this.profileVars.firstNameVar.length;
          const isLastNameEmpty = !this.profileVars.lastNameVar.length;
          const isEmailEmpty = !this.profileVars.emailVar.length;
          return hasErrors || isFirstNameEmpty || isLastNameEmpty || isEmailEmpty;
        case 2:
          const isStammEmpty = !this.profileVars.stammVar.length;
          const isStammesGroupEmpty = !this.profileVars.stammesGroupVar.length;
          return hasErrors || isStammEmpty || isStammesGroupEmpty;
        case 3:
          const isBirthDateEmpty = !this.profileVars.birthDateVar.length;
          const isGenderEmpty = !this.profileVars.genderVar.length;
          return hasErrors || isBirthDateEmpty || isGenderEmpty;
        case 4:
          const isStreetNameEmpty = !this.profileVars.streetNameVar.length;
          const isStreetNumberEmpty = !this.profileVars.streetNumberVar.length;
          const isCityNameEmpty = !this.profileVars.cityNameVar.length;
          const isCityCodeEmpty = !this.profileVars.cityCodeVar.length;
          const isPhoneNumberEmpty = !this.profileVars.phoneNumberVar.length;
          return hasErrors || isStreetNameEmpty || isStreetNumberEmpty || isCityNameEmpty || isCityCodeEmpty || isPhoneNumberEmpty;
        case 5:
          const isPasswordEmpty = !this.profileVars.passwordVar.length;
          const isPassword2Empty = !this.profileVars.password2Var.length;
          return hasErrors || isPasswordEmpty || isPassword2Empty || !this.passwordsAreIdentical;
        default:
          break;
      }

      return false
    },
    firstName: {
      get() {
        return this.profileVars.firstNameVar
      },
      set(newVal: string) {
        this.profileVars.firstNameVar = newVal as string
      }
    },
    lastName: {
      get() {
        return this.profileVars.lastNameVar
      },
      set(newVal: string) {
        this.profileVars.lastNameVar = newVal
      }
    },
    fahrtenName: {
      get(): string {
        return this.profileVars.fahrtenNameVar
      },
      set(newVal: string) {
        this.profileVars.fahrtenNameVar = newVal
      }
    },
    email: {
      get(): string {
        return this.profileVars.emailVar
      },
      set(newVal: string) {
        this.profileVars.emailVar = newVal
      }
    },
    streetName: {
      get(): string {
        return this.profileVars.streetNameVar
      },
      set(newVal: string) {
        this.profileVars.streetNameVar = newVal
      }
    },
    streetNumber: {
      get(): string {
        return this.profileVars.streetNumberVar
      },
      set(newVal: string) {
        this.profileVars.streetNumberVar = newVal
      }
    },
    cityName: {
      get(): string {
        return this.profileVars.cityNameVar
      },
      set(newVal: string) {
        this.profileVars.cityNameVar = newVal
      }
    },
    cityCode: {
      get(): string {
        return this.profileVars.cityCodeVar
      },
      set(newVal: string) {
        this.profileVars.cityCodeVar = newVal
      }
    },
    addressAddition: {
      get(): string {
        return this.profileVars.addressAdditionVar
      },
      set(newVal: string) {
        this.profileVars.addressAdditionVar = newVal
      }
    },
    phoneNumber: {
      get(): string {
        return this.profileVars.phoneNumberVar
      },
      set(newVal: string) {
        this.profileVars.phoneNumberVar = newVal
      }
    },
    gender: {
      get(): string {
        return this.profileVars.genderVar
      },
      set(newVal: "male" | "female" | "diverse") {
        this.profileVars.genderVar = newVal
      }
    },
    birthDate: {
      get(): string {
        return this.profileVars.birthDateVar
      },
      set(newVal: string) {
        this.profileVars.birthDateVar = newVal
      }
    },
    stamm: {
      get(): string {
        return this.profileVars.stammVar
      },
      set(newVal: string) {
        this.profileVars.stammVar = newVal
      }
    },
    stammesGroup: {
      get(): string {
        return this.profileVars.stammesGroupVar
      },
      set(newVal: string) {
        this.profileVars.stammesGroupVar = newVal
      }
    },
    password: {
      get(): string {
        return this.profileVars.passwordVar
      },
      set(newVal: string) {
        this.profileVars.passwordVar = newVal
      }
    },
    password2: {
      get(): string {
        return this.profileVars.password2Var
      },
      set(newVal: string) {
        this.profileVars.password2Var = newVal
      }
    },
    passwordsAreIdentical: {
      get(): boolean {
        return this.passwordsAreIdenticalVar
      },
      set(newVal: boolean) {
        this.passwordsAreIdenticalVar = newVal
      }
    }
  },
  methods: {
    cancel() {
      return '/home'
    },
    back() {
      this.currentStep -= 1
    },
    next() {
      this.currentStep += 1
    },
    send() {
      alert(`Save following data to database and register account and forward to email confirmation page:
        ${JSON.stringify(this.profileVars, null, 2)}`)
      this.currentStep += 1
    },
    jumpToStep(step: number) {
      if (step < this.currentStep) {
        this.currentStep = step;
      }
    },
    handleErrorUpdate(value: number) {
      this.passwordsAreIdentical = this.profileVars.passwordVar == this.profileVars.password2Var;
      if (value === 0) {
        this.hasErrors = false
      } else {
        this.hasErrors = true
      }
    }
  }
});
</script>