<template>
  <div class="fixed">
    hasChanged: {{ dataHasChanged }}
    <br />
    hasErrors: {{ hasErrors }}
    <br />
    test: {{ profileVars.birthDate }}
    <br />
    allergies: {{ profileVars.allergies }}
  </div>
  <div class="w-3/5 m-auto flex flex-col gap-8">
    <div class="flex flex-row gap-8 align-middle justify-center">
      <Avatar size="big" :src="profileVars.avatarURL" />
      <div class="flex flex-col justify-between">
        <SecondaryButton :target="() => changeProfilePicture()"
          >Wechseln</SecondaryButton
        >
        <TertiaryButton
          class="self-center"
          :target="() => setProfilePicturetoDefault()"
          >Entfernen</TertiaryButton
        >
      </div>
    </div>
    <div class="flex flex-row gap-2 flex-wrap align-middle justify-center">
      <Tag v-for="(role, index) in profileVars.roles" :key="index">{{
        role
      }}</Tag>
    </div>
    <TextInputGroup
      class="grid grid-cols-2 gap-4"
      :input-fields="importantInputFields"
    />
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">Passwort</p>
      <p class="font-p">
        Läuft ab in {{ daysUntilPwExpiration }} Tagen, am:
        {{ user.passwordExpiration }}
      </p>
      <PrimaryButton target="https://dpbm.de">Jetzt ändern</PrimaryButton>
    </div>
    <Divider />
    <div class="grid grid-cols-2 gap-4">
      <TextInput
        v-model="profileVars.birthDate"
        label="Geburtsdatum"
        required
        type="date"
        placeholder="yyyy-mm-dd"
        :value="profileVars.birthDate"
        @error-occured="(eMsg) => addError('birthDate', eMsg)"
        @error-solved="(eMsg) => removeError('birthDate', eMsg)"
      />
      <DropdownInput
        v-model="profileVars.gender"
        :options="genderOptions"
        label="Geschlecht"
        required
      />

        <div>
            <label class="block font-highlight text-proto-darkgrey">
                Allergien ({{ selectingAllergies }})
            </label>
            <button @click="selectingAllergies = true">click me!</button>
            <LargeMultiselectInput :display="selectingAllergies" position="body" :fields="allergiesOptions" @close="selectingAllergies = false"/>
        </div>
      
    </div>
    <Divider />
    <TextInputGroup
      class="grid grid-cols-2 gap-4"
      :input-fields="locationInputFields"
    />
    <div class="grid grid-cols-2 gap-4">
      <SecondaryButton
        class="justify-self-end"
        :target="() => resetChanges()"
        :disabled="hasErrors || (!hasErrors && !dataHasChanged)"
        >Zurücksetzen</SecondaryButton
      >
      <PrimaryButton
        :target="() => saveProfileChanges()"
        :disabled="hasErrors || (!hasErrors && !dataHasChanged)"
        >Speichern</PrimaryButton
      >
    </div>
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">
        Zwei-Faktor-Authentifizierung
      </p>
      <PrimaryButton target="https://dpbm.de">Hinzufügen</PrimaryButton>
    </div>
    <Divider />
    <div class="flex flex-col gap-4">
      <p class="block font-highlight text-proto-darkgrey">
        Gefährlicher Bereich
      </p>
      <PrimaryButton target="https://www.dpbm.de"
        >Account löschen</PrimaryButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/components/Avatar/Avatar.vue";
import TertiaryButton from "@/components/button/TertiaryButton.vue";
import SecondaryButton from "@/components/button/SecondaryButton.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import Divider from "@/components/divider/Divider.vue";
import Tag from "@/components/tag/Tag.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DropdownInput from "@/components/inputs/DropdownInput.vue";
import TextInputGroup from "./TextInputGroup.vue";
import { TextInputGroupConfig } from "./TextInputGroupConfig";
import { computed } from "@vue/reactivity";
import { objsAreDeeplyEqual } from "@/mixins/equalityCheckUtils";
import LargeMultiselectInput from "@/components/inputs/LargeMultiselectInput.vue";

const store = useStore();
const user = store.getLoggedInUserData();

const initialState = {
  avatarURL: user.avatarURL,
  roles: user.roles,
  firstName: user.firstName,
  lastName: user.lastName,
  fahrtenName: user.fahrtenName,
  email: user.email,
  streetName: user.address.street,
  streetNumber: user.address.number,
  cityName: user.address.city,
  cityCode: user.address.code,
  addressAddition: user.address.addition,
  phoneNumber: user.phone,
  gender: user.gender,
  allergies: user.allergies,
  birthDate: user.birthdate,
};

const profileVars = reactive({ ...initialState });

const currentInputErrors = reactive(new Map<string, string[]>());

const selectingAllergies = ref(false);

const dataHasChanged = computed(() => {
  //get rid of proxies for property comparisons
  const currentState = JSON.parse(JSON.stringify(profileVars));

  return !objsAreDeeplyEqual(currentState, initialState);
});

const hasErrors = computed(() => {
  const errorLists = currentInputErrors.values();
  for (const errorList of errorLists) {
    if (errorList.length > 0) {
      return true;
    }
  }
  return false;
});

const importantInputFields: TextInputGroupConfig = {
  firstName: {
    attributes: {
      label: "Vorname",
      required: true,
      type: "text",
      placeholder: "Clara",
      get value(): string {
        return profileVars.firstName;
      },
      set value(v: string) {
        profileVars.firstName = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("firstName", eMsg),
      errorSolved: (eMsg: string) => removeError("firstName", eMsg),
    },
  },
  lastName: {
    attributes: {
      label: "Nachname",
      required: true,
      type: "text",
      placeholder: "Müller",
      get value(): string {
        return profileVars.lastName;
      },
      set value(v: string) {
        profileVars.lastName = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("lastName", eMsg),
      errorSolved: (eMsg: string) => removeError("lastName", eMsg),
    },
  },
  fartenName: {
    attributes: {
      label: "Fahrtenname",
      required: false,
      type: "text",
      placeholder: "Schlumpf",
      get value(): string {
        return profileVars.fahrtenName;
      },
      set value(v: string) {
        profileVars.fahrtenName = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("fahrtenName", eMsg),
      errorSolved: (eMsg: string) => removeError("fahrtenName", eMsg),
    },
  },
  email: {
    attributes: {
      label: "E-Mail",
      required: true,
      type: "email",
      placeholder: "clara@mueller.de",
      get value(): string {
        return profileVars.email;
      },
      set value(v: string) {
        profileVars.email = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("email", eMsg),
      errorSolved: (eMsg: string) => removeError("email", eMsg),
    },
  },
};

const locationInputFields: TextInputGroupConfig = {
  streetName: {
    attributes: {
      label: "Straße",
      required: true,
      type: "text",
      placeholder: "Musterstraße",
      get value(): string {
        return profileVars.streetName;
      },
      set value(v: string) {
        profileVars.streetName = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("streetName", eMsg),
      errorSolved: (eMsg: string) => removeError("streetName", eMsg),
    },
  },
  streetNumber: {
    attributes: {
      label: "Hausnummer",
      required: true,
      type: "text",
      placeholder: "42",
      get value(): string {
        return profileVars.streetNumber;
      },
      set value(v: string) {
        profileVars.streetNumber = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("streetNumber", eMsg),
      errorSolved: (eMsg: string) => removeError("streetNumber", eMsg),
    },
  },
  cityName: {
    attributes: {
      label: "Stadt",
      required: true,
      type: "text",
      placeholder: "Köln",
      get value(): string {
        return profileVars.cityName;
      },
      set value(v: string) {
        profileVars.cityName = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("cityName", eMsg),
      errorSolved: (eMsg: string) => removeError("cityName", eMsg),
    },
  },
  cityCode: {
    attributes: {
      label: "PLZ",
      required: true,
      type: "number",
      placeholder: "12345",
      get value(): string {
        return profileVars.cityCode;
      },
      set value(v: string) {
        profileVars.cityCode = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("cityCode", eMsg),
      errorSolved: (eMsg: string) => removeError("cityCode", eMsg),
    },
  },
  adressAddition: {
    attributes: {
      label: "Adresszusatz",
      type: "text",
      placeholder: "c/o Bauer",
      get value(): string {
        return profileVars.addressAddition;
      },
      set value(v: string) {
        profileVars.addressAddition = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("adressAddition", eMsg),
      errorSolved: (eMsg: string) => removeError("adressAddition", eMsg),
    },
  },
  phoneNumber: {
    attributes: {
      label: "Telefonnummer",
      required: true,
      type: "tel",
      placeholder: "+49 123 456789",
      get value(): string {
        return profileVars.phoneNumber;
      },
      set value(v: string) {
        profileVars.phoneNumber = v;
      },
    },
    events: {
      errorOccured: (eMsg: string) => addError("phoneNumber", eMsg),
      errorSolved: (eMsg: string) => removeError("phoneNumber", eMsg),
    },
  },
};

const genderOptions = computed(() => {
  const profileGender = store.getLoggedInUserData().gender;

  return [
    {
      value: "diverse",
      text: "Divers",
      selected: profileGender === "diverse",
    },
    {
      value: "female",
      text: "Weiblich",
      selected: profileGender === "female",
    },
    {
      value: "male",
      text: "Männlich",
      selected: profileGender === "male",
    },
  ];
});

const allergiesOptions = computed(() => {
    const allAllergies = ['vegetarisch', 'keine Milch', 'Weizen', 'Gluten', 'Laktose'];
    const result = {};
    for (const allergy of allAllergies) {
        result[allergy] = profileVars.allergies.includes(allergy);
    }

    const proxiedResult = new Proxy(result, {
        get (target, name, receiver) {
            //todo
        }
    })


    return result;
});

const daysUntilPwExpiration = computed(() => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  function dateDiffInDays(a: Date, b: Date): number {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const expirationDate = new Date(user.passwordExpiration);
  //todo this.user.passwordExpiration has invalid form for Date
  const today = new Date();

  return dateDiffInDays(today, expirationDate);
});

function setProfilePicturetoDefault() {
  //todo what is default icon? ui-avatars.com
  alert("Open Modal to ask for confirmation to set image to default");
}

function changeProfilePicture() {
  //todo how to change icon via api (not possible in anmelde-tool)
  alert("Open Modal to change Profile Picture");
}

function addError(fieldId: string, eMsg: string) {
  if (!currentInputErrors.has(fieldId)) {
    currentInputErrors.set(fieldId, []);
  }
  const errors = currentInputErrors.get(fieldId);
  if (errors === undefined) {
    console.error(
      "somehow inputErrors entry managed to lose its array, fieldId: " + fieldId
    );
    return;
  }
  if (!errors.includes(eMsg)) {
    errors.push(eMsg);
  }
}

function removeError(fieldId: string, eMsg: string) {
  const errors = currentInputErrors.get(fieldId);
  if (errors === undefined) {
    console.error(
      "trying to remove error from empty field list, fieldId: " + fieldId
    );
    return;
  }

  currentInputErrors.set(
    fieldId,
    errors.filter((item) => item !== eMsg)
  );
}

function saveProfileChanges() {
  /**
   * request to api.anmelde-tool.de/auth/personal-data
   * POST with object consisting of account properties
   * todo exact object structure
   */
  const currentProfileData = profileVars;
  alert(
    `Save following data to database: ${JSON.stringify(
      currentProfileData,
      null,
      2
    )}`
  );
}

function resetChanges() {
  Object.assign(profileVars, initialState);
}
</script>
