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
      <TextInput v-model="firstName" label="Vorname" required type="text" placeholder="Clara" :value="firstName" />
      <TextInput v-model="lastName" label="Nachname" required type="text" placeholder="Müller" :value="lastName" />
    </div>
    <PrimaryButton :target="() => saveProfileChanges()" >Speichern</PrimaryButton>
    <Divider />
  </div>
</template>

<script lang="ts">
import Avatar from "@/components/Avatar/Avatar.vue"
import TertiaryButton from "@/components/button/TertiaryButton.vue";
import SecondaryButton from "@/components/button/SecondaryButton.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import Divider from "@/components/divider/Divider.vue";
import Tag from "@/components/tag/Tag.vue"; 
import TextInput from "@/components/inputs/TextInput.vue";

export default defineComponent({
  name: 'UserProfile',
  components: {
    Avatar,
    TertiaryButton,
    SecondaryButton,
    PrimaryButton
    //Divider,
    //Tag,
    //TextInput
  },

  setup() {
   
    const store = useStore();
    //const avatarURLVar = ref('');
    //const rolesVar = ref();
    //const firstNameVar = ref('');
    //const lastNameVar = ref('');

    const profileVars = reactive({
      avatarURLVar: '',
      rolesVar: [],
      firstNameVar: '',
      lastNameVar: '',
    })

    onMounted(() => {
      const user = store.getLoggedInUserData();
      profileVars.avatarURLVar = user.avatarURL;
      profileVars.rolesVar = user.roles;
      profileVars.firstNameVar = user.firstName;
      profileVars.lastNameVar = user.lastName;

    })
    return { 
        store,
        profileVars
    }
  },
  computed: {
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
        this.avatarURLVar = newVal
      }
    },
    roles: {
      get(): string[] {
        return this.rolesVar
      },
      set(newVal: string[]) {
        this.roles = newVal
      }
    }
  },
  methods: {
    loadUserDataInInputValues() {
      const user = this.store.getLoggedInUserData()
      this.firstNameVar = user.firstName;
      this.lastNameVar = user.lastName;
    },
    setProfilePicturetoDefault() {
      alert('Open Modal to ask for confirmation to set image to default')
    },
    changeProfilePicture() {
      alert('Open Modal to change Profile Picture')
    },
    saveProfileChanges() {
      alert(`${this.firstName} ${this.lastName}`)
    }
  },

})
</script>
