<template>
  <div class="w-3/5 m-auto flex flex-col gap-8">
    <div class="flex flex-row gap-8 align-middle justify-center">
      <Avatar size="big" :src="avatarURL" />
      <div class="flex flex-col justify-between">
        <SecondaryButton :target="() => changeProfilePicture()">Wechseln</SecondaryButton>
        <TertiaryButton class="self-center" :target="() => setProfilePicturetoDefault()">Entfernen</TertiaryButton>
      </div>
    </div>
    <div class="flex flex-row gap-2 flex-wrap align-middle justify-center">
      <Tag v-for="(role, index) in roles" :key="index" >{{ role }}</Tag>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <TextInput v-model="firstName" label="Vorname" required type="text" placeholder="Clara" :value="firstName" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="lastName" label="Nachname" required type="text" placeholder="Müller" :value="lastName" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="fahrtenName" label="Fahrtenname" type="text" placeholder="Schlumpf" :value="fahrtenName" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="email" label="E-Mail" required type="email" placeholder="clara@müller.de" :value="email" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
    </div>
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">Passwort</p>
      <p class="font-p">Läuft ab in {{ daysUntilPwExpiration }} Tagen, am: {{ user.passwordExpiration }}</p>
      <PrimaryButton target="https://dpbm.de" >Jetzt ändern</PrimaryButton>
    </div>
    <Divider />
    <div class="grid grid-cols-2 gap-4">
      <TextInput v-model="birthDate" label="Geburtsdatum" required type="date" placeholder="yyyy-mm-dd" :value="birthDate" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <DropdownInput v-model="gender" :options="getGenderOptionsMap" label="Geschlecht" required @click="setDataHasChanges" />
    </div>
    <Divider />
    <div class="grid grid-cols-2 gap-4">
      <TextInput v-model="streetName" label="Straße" required type="text" placeholder="Musterstraße" :value="streetName" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="streetNumber" label="Hausnummer" required type="text" placeholder="48" :value="streetNumber" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="cityName" label="Stadt" required type="text" placeholder="Köln" :value="cityName" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="cityCode" label="PLZ" required type="number" placeholder="12345" :value="cityCode" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="addressAddition" label="Addresszusatz" type="text" placeholder="c/o Bauer" :value="addressAddition" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
      <TextInput v-model="phoneNumber" label="Telefonnummer" required type="text" placeholder="+49 123 456789" :value="phoneNumber" @click="setDataHasChanges" @error-update="handleErrorUpdate" />
    </div>
    <!-- <Divider />
    <div>
      <div class="flex flex-row gap-2 flex-wrap">
        <Tag v-for="(allergy, index) in user.allergies" :key="index" >{{ allergy }}</Tag>
      </div>
      <DropdownInput v-model="gender" multiple :options="genderOptionsList" label="Allergien" required @click="setDataHasChanges" />
    </div> -->
    <div class="grid grid-cols-2 gap-4">
      <SecondaryButton class="justify-self-end" :target="() => resetChanges()" :disabled="!dataHasChanged">Zurücksetzen</SecondaryButton>
      <PrimaryButton :target="() => saveProfileChanges()" :disabled="!dataHasChanged">Speichern</PrimaryButton>
    </div>
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">Zwei-Faktor-Authentifizierung</p>
      <PrimaryButton target="https://dpbm.de" >Hinzufügen</PrimaryButton>
    </div>
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">Gefährlicher Bereich</p>
      <PrimaryButton target="https://dpbm.de">Account löschen</PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeUpdate, onMounted } from 'vue'
import {mapState} from 'pinia'
import { mappingDataStore } from "@/store/mappingDataStore";
import Avatar from "@/components/Avatar/Avatar.vue"
import TertiaryButton from "@/components/button/TertiaryButton.vue";
import SecondaryButton from "@/components/button/SecondaryButton.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import Divider from "@/components/divider/Divider.vue";
import Tag from "@/components/tag/Tag.vue"; 
import TextInput from "@/components/inputs/TextInput.vue";
import DropdownInput from "@/components/inputs/DropdownInput.vue";

export default defineComponent({
  name: 'UserProfile',
  components: {
    Avatar,
    TertiaryButton,
    SecondaryButton,
    PrimaryButton
    //Divider,
    //Tag,
    //TextInput,
    //DropdownInput
  },

  setup() {
    const store = useStore();
    const user = store.getLoggedInUserData();

    const initialState = {
      avatarURLVar: user.avatarURL,
      rolesVar: user.roles,
      firstNameVar: user.firstName,
      lastNameVar: user.lastName,
      fahrtenNameVar: user.fahrtenName,
      emailVar: user.email,
      streetNameVar: user.address.street,
      streetNumberVar: user.address.number,
      cityNameVar: user.address.city,
      cityCodeVar: user.address.code,
      addressAdditionVar: user.address.addition,
      phoneNumberVar: user.phone,
      genderVar: user.gender,
      birthDateVar: user.birthdate
    }

    let profileVars = reactive({...initialState}) 
    
    let dataHasChanged = false;
    let hasErrors = false;

    onMounted(() => {
      const mappingStore = mappingDataStore()
      mappingStore.fetchScoutHierarchy();
      mappingStore.fetchGender();
    })

    return { 
        store,
        profileVars,
        initialState,
        dataHasChanged,
        user,
        hasErrors
    }
  },
  computed: {
    ...mapState(mappingDataStore, ['getScoutHierarchyMap', 'getGenderOptionsMap']),
    allergiesOptionsList() {
      return ''
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
    avatarURL: {
      get() {
        return this.profileVars.avatarURLVar
      },
      set(newVal: string) {
        this.profileVars.avatarURLVar = newVal
      }
    },
    roles: {
      get(): string[] {
        return this.profileVars.rolesVar
      },
      set(newVal: string[]) {
        this.profileVars.rolesVar = newVal
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
    daysUntilPwExpiration() {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      function dateDiffInDays(a: Date, b: Date) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

      const expirationDate = new Date(this.user.passwordExpiration);
      const today = new Date();

      return dateDiffInDays(today, expirationDate);
    }
  },
  methods: {
    setProfilePicturetoDefault() {
      alert('Open Modal to ask for confirmation to set image to default')
    },
    changeProfilePicture() {
      alert('Open Modal to change Profile Picture')
    },
    saveProfileChanges() {
      if (!this.hasErrors) {
        const currentProfileData = this.profileVars;
        alert(`Save following data to database: ${JSON.stringify(currentProfileData, null, 2)}`)
      } else {
        alert(`Änderungen können mit Fehlern nicht gespeichert werden`)
      }

    },
    resetChanges() {
      Object.assign(this.profileVars, this.initialState);
      this.dataHasChanged = false;
    },
    setDataHasChanges() {
      this.dataHasChanged = true;
    },
    handleErrorUpdate(value: number) {
      if (value === 0) {
        this.hasErrors = false
      } else {
        this.hasErrors = true
      }
    }
  },

})
</script>
