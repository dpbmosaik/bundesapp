<template>
  <div>
    <div class="flex justify-between">
      <label :for="name" class="block font-highlight text-proto-darkgrey">
        {{ label }}
        <span v-show="required" class="text-red-700"> *</span></label
      >
      <span v-show="!required" class="font-info text-proto-grey">Optional</span>
    </div>
    <div class="mt-1">
      <input
        :value="value"
        :type="type"
        :name="name"
        class="focus:ring-2 focus:bg-white block w-full rounded-md bg-proto-lightgrey font-p placeholder:font-p placeholder:text-proto-grey"
        :class="inputCSSClasses"
        :placeholder="placeholder"
        @input="validateAndUpdateNewInput"
      />
    </div>
    <p v-show="currentError !== ''" class="mt-2 text-sm text-red-600">
      {{ currentError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import {
  isEmpty,
  isAlphanumeric,
  isEmail,
  isSecurePassword,
  isUrl,
  isNumeric,
  isPhoneNumber,
} from "@/mixins/inputCheckingUtils";

const currentError = ref("");
const props = defineProps({
  label: {
    type: String,
    default: "Label Fehlt",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<
      "email" | "text" | "number" | "password" | "url" | "date" | "tel"
    >,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "errorOccured", eMsg: string): void;
  (e: "errorSolved", eMsg: string): void;
}>();

const name = computed(() => props.label.toLowerCase());

const inputCSSClasses = computed(() => {
  if (currentError.value === "") {
    return "border-0 focus:ring-proto-darkgrey focus:border-proto-darkgrey";
  } else {
    return "border border-red-700 focus:ring-red-700 focus:border-red-700 text-red-700";
  }
});

function validateAndUpdateNewInput(event: Event) {
  validateField(event);
  updateValue(event);
}

function updateValue(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

function validateField(event: Event) {
  const inputType = props.type;
  const inputValue = (event.target as HTMLInputElement).value;

  //number inputs pretend to be empty if they have invalid characters
  //currently this cant differ between empty input and wrong input for numbers
  if (inputType !== "number" && isEmpty(inputValue) && props.required) {
    currentError.value = "Feld darf nicht leer sein";
    return;
  }

  const errorDetails = {
    text: {
      msg: "Bitte nur Buchstaben, Zahlen und , . ' - verwenden.",
      check: (input: unknown) => isEmpty(input) || isAlphanumeric(input),
    },
    email: {
      msg: "Bitte eine gültige Email verwenden.",
      check: isEmail,
    },
    number: {
      msg: "Bitte nur Zahlen verwenden.",
      check: isNumeric,
    },
    password: {
      msg: "Bitte mindestens acht Zeichen, mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen verwenden.",
      check: isSecurePassword,
    },
    url: {
      msg: "Bitte eine gültige Url verwenden.",
      check: isUrl,
    },
    date: {
      msg: "",
      check: (...ignore: any) => true,
    },
    tel: {
      msg: "Bitte eine gültige Telefonnummer eingeben.",
      check: isPhoneNumber,
    },
  };

  const errorType = errorDetails[inputType];
  const isCorrect = errorType.check(inputValue);

  if (isCorrect) {
    if (currentError.value !== "") {
      emit("errorSolved", currentError.value);
    }
    currentError.value = "";
  } else {
    currentError.value = errorType.msg;
    emit("errorOccured", currentError.value);
  }
}
</script>
