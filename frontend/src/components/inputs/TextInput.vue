<template>
  <div>
    <div class="flex justify-between">
      <label :for="name" class="block font-highlight text-proto-darkgrey">{{ label }}<span v-show="required" class="text-red-700"> *</span></label>
      <span v-show="!required" class="font-info text-proto-grey">Optional</span>
    </div>
    <div class="mt-1">
      <input
        :value="value"
        :type="type"
        :name="name"
        class="focus:ring-2 focus:bg-white block w-full rounded-md bg-proto-lightgrey font-p placeholder:font-p placeholder:text-proto-grey"
        :class="errors.length ? 'border border-red-700 focus:ring-red-700 focus:border-red-700 text-red-700' : 'border-0 focus:ring-proto-darkgrey focus:border-proto-darkgrey'"
        :placeholder="placeholder"
        @input="handleInputValueChange"
       />
    </div>
    <p v-for="(error, index) in errors" v-show="errors.length" :key="index" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
    import { PropType } from "vue";

    export default defineComponent({
        name: "TextInput",
        props: {
            label: {
                type: String,
                default: 'Label Fehlt'
            },
            placeholder: {
                type: String,
                default: ''
            },
            required: {
                type: Boolean,
                default: false
            },
            type: {
                type: String as PropType<'email' | 'text' | 'number' | 'password' | 'url' | 'date'>,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        emits: {'update:modelValue': null, 'errorUpdate': null},
        setup() {
            return {
                errors: [] as string[]
            }
        },
        computed: {
            name() {
                return this.label.toLowerCase();
            }
        },
        methods: {
            handleInputValueChange(event: Event) {
                this.validateField(event);
                this.updateValue(event);
                this.$emit('errorUpdate', this.errors.length);
            },
            updateValue(event: Event) {
                this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
            },
            validateField(event: Event) {
                const inputType = this.type;
                const inputValue = (event.target as HTMLInputElement).value
                let errorMessage: string;
                if(this.required) {
                    errorMessage = "Feld darf nicht leer sein";
                    if (!this.errors.includes(errorMessage) && !this.isFilled(inputValue)) {
                        this.errors.push(errorMessage);
                    } else if (this.errors.includes(errorMessage) && this.isFilled(inputValue)) {
                        this.errors = this.errors.filter(item => item !== errorMessage)
                    }
                } 
                switch (inputType) {
                    case 'text':
                        errorMessage = "Bitte nur Buchstaben, Zahlen und , . ' - verwenden."
                        this.handleErrorMessage(this.isAlphanumeric(inputValue), errorMessage, inputValue)
                        break;
                    case 'email':
                        errorMessage = "Bitte eine gültige Email verwenden"
                        this.handleErrorMessage(this.isEmail(inputValue), errorMessage, inputValue)
                        break;
                    case 'number':
                        errorMessage = "Bitte nur Zahlen verwenden"
                        this.handleErrorMessage(this.isNumeric(inputValue), errorMessage, inputValue)
                        break;
                    case 'password':
                        errorMessage = "Bitte mindestens acht Zeichen, mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen verwenden"
                        this.handleErrorMessage(this.isSecurePassword(inputValue), errorMessage, inputValue)
                        break;
                    case 'url':
                        errorMessage = "Bitte eine gültige Url verwenden"
                        this.handleErrorMessage(this.isUrl(inputValue), errorMessage, inputValue)
                        break;
                    case 'date':
                        
                        break;
                
                    default:
                        break;
                }
            },
            handleErrorMessage(validator: boolean, msg: string, input: string) {
                if (!validator && !this.errors.includes(msg) && input.length) {                            
                    this.errors.push(msg)
                } else if (validator) {
                    this.errors = this.errors.filter(item => item !== msg)
                }
            },
            isAlphanumeric(value: unknown, set = 'default') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sets: {[index: string]: any, default: RegExp, latin: RegExp} = {
                    default: /^[a-zA-Z0-9À-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'-]+$/,
                    latin: /^[a-zA-Z0-9,.'-]+$/
                }
                if (typeof value != 'string') {
                    return false
                }
                const selectedSet = sets.hasOwnProperty(set) ? set : 'default'
                
                // eslint-disable-next-line security/detect-object-injection
                return sets[selectedSet].test(value)
            },
            isAlpha(value: unknown , set = 'default'): boolean {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sets: {[index: string]: any, default: RegExp, latin: RegExp} = {
                    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'-]+$/,
                    latin: /^[a-zA-Z,.'-]+$/
                }
                if (typeof value != 'string') {
                    return false
                }
                const selectedSet = sets.hasOwnProperty(set) ? set : 'default'
                // eslint-disable-next-line security/detect-object-injection
                return sets[selectedSet].test(value)
            },
            isEmail(value: unknown) {
                // eslint-disable-next-line security/detect-unsafe-regex
                const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                if (typeof value != 'string') {
                    return false
                }
                return isEmail.test(value)
            },
            isFilled(value: unknown) {
                if (value === '') {
                    return false
                }
                return true
            },
            isNumeric(value: unknown) {
                const isNumber = /[0-9]/
                if (typeof value != 'string') {
                    return false
                }
                return isNumber.test(value)
            },
            isUrl(value: unknown) {
                // eslint-disable-next-line security/detect-unsafe-regex
                const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
                // eslint-disable-next-line security/detect-unsafe-regex
                const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
                const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

                if (typeof value !== 'string') {
                    return false;
                }
                let match = value.match(protocolAndDomainRE);
                if (!match) {
                    return false;
                }
                let everythingAfterProtocol = match[1];
                if (!everythingAfterProtocol) {
                    return false;
                }

                if (localhostDomainRE.test(everythingAfterProtocol) ||
                    nonLocalhostDomainRE.test(everythingAfterProtocol)) {
                    return true;
                }
                
                return false
            },
            isSecurePassword(value: unknown) {
                const isSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
                if (typeof value != 'string') {
                    return false
                }
                return isSecure.test(value)
            }
        }
    })
</script>