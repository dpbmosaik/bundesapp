<template lang="">
    <div class="flex flex-col gap-6">
        <div class="flex flex-row">
            <div>
                <Avatar size="big" :src="getAvatarUrl" :alt="`Profilfoto von ${getFullName}`" />
            </div>
            <div class="flex flex-col justify-center pl-6 gap-2">
                <p class="font-h3">{{ getFullName }}</p>
                <p class="font-h3 text-proto-grey">{{ `Stamm ${getStamm}` }}</p>
            </div>
        </div>
        <div class="flex flex-row gap-2 flex-wrap">
            <Tag v-for="(role, index) in getRoles" :key="index">{{ role }}</Tag>
        </div>
        <Divider /> <!-- ---------------------------------------------- -->
        <div class="flex flex-row flex-wrap gap-8">
            <TertiaryButton target="https://dpbm.de" icon="message">Email schreiben</TertiaryButton> <!-- mailto: Perosns Mail -->
            <TertiaryButton target="https://dpbm.de" icon="chat">Anschreiben</TertiaryButton> <!-- Opens Rocket Chat with Person -->
            <TertiaryButton target="https://dpbm.de" icon="profile">Bearbeiten</TertiaryButton> <!-- Goes Profile Edit Page to this person -->
            <TertiaryButton target="https://dpbm.de" icon="shieldFail">Deaktivieren</TertiaryButton> <!-- Opens modal and asks for confirmation -->
            <TertiaryButton target="https://dpbm.de" icon="delete">Löschen</TertiaryButton> <!-- Opens modal and asks for confirmation -->
        </div>
        <Divider /> <!-- ---------------------------------------------- -->
        <div class="flex flex-row flex-wrap gap-8">
            <div>
                <p class="font-description text-proto-grey">Email</p>
                <p class="font-p">{{ getEmail }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Telefon</p>
                <p class="font-p">{{ getPhone }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Straße + Nr.</p>
                <p class="font-p">{{ getFullStreet }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">PLZ Ort</p>
                <p class="font-p">{{ getFullCityCode }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Adresszusatz</p>
                <p class="font-p">{{ getAddressAddition }}</p>
            </div>
        </div>
        <Divider /> <!-- ---------------------------------------------- -->
        <div class="flex flex-row flex-wrap gap-8">
            <div>
                <p class="font-description text-proto-grey">Geburtstag</p>
                <p class="font-p">{{ getBirthdate }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Geschlecht</p>
                <p class="font-p">{{ getGender }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Bundespost</p>
                <p class="font-p">{{ getBundespostBool }}</p>
            </div>
        </div>
        <Divider /> <!-- ---------------------------------------------- -->
        <div class="flex flex-col gap-8">
            <div>
                <p class="font-description text-proto-grey">Datum des letzten gült. Führungszeugnis</p>
                <p class="font-p">{{ getCriminalRecordlastValidIssued }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Datum der Einsicht des Führungszeugnis</p>
                <p class="font-p">{{ getCriminalRecordinspection }}</p>
            </div>
            <div>
                <p class="font-description text-proto-grey">Neues Führungszeugnis fällig am</p>
                <p class="font-p">{{ getCriminalRecordlastnewDueOn }}</p>
            </div>
        </div>
        <Divider /> <!-- ---------------------------------------------- -->
        <div class="flex flex-row flex-wrap gap-4">
            <GroupCard v-for="(group, index) in getGroups" :key="index"/>
        </div>
    </div>
</template>


<script lang="ts">
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";
import Avatar from "@/components/Avatar/Avatar.vue";
import Tag from "@/components/tag/Tag.vue";
import Divider from "@/components/divider/Divider.vue";
import TertiaryButton from "@/components/button/TertiaryButton.vue";
import GroupCard from "@/components/groupCard/GroupCard.vue";

export default defineComponent({
    mixins: [dummyTestDB],
    props: {
        userId: String,
    },
    computed: {
        getUser(): DummyDBEntry {
            return this.getUserSafely(this.userId);
        },
        getFullName(): String {
            return this.buildFullName(this.getUser)
        },
        getAvatarUrl(): String {
            return this.getUser.avatarURL;
        },
        getStamm() {
            return this.getUser.stamm;
        },
        getRoles() {
            return this.getUser.roles;
        },
        getEmail() {
            return this.getUser.email;
        },
        getPhone() {
            return this.getUser.phone;
        },
        getFullStreet() {
            return `${this.getUser.address.street} ${this.getUser.address.number}`;
        },
        getFullCityCode() {
            return `${this.getUser.address.code} ${this.getUser.address.city}`;
        },
        getAddressAddition() {
            const addressAddition = this.getUser.address.addition;
            return addressAddition.length === 0 ? '-' : addressAddition;
        },
        getBirthdate() {
            return this.getUser.birthdate;
        },
        getGender() {
            const gender = this.getUser.gender;
            if (gender === 'male') {
                return 'm'
            } else if (gender === 'female') {
                return 'w'
            } else {
                return 'd'
            }
        },
        getBundespostBool() {
            const bundespostDigital = this.getUser.bundespostDigital;
            return bundespostDigital ? 'nur digital' : 'analog + digital';
        },
        getCriminalRecordlastValidIssued() {
            return this.getUser.criminalRecordDates.lastValidIssued;
        },
        getCriminalRecordinspection() {
            return this.getUser.criminalRecordDates.inspection;
        },
        getCriminalRecordlastnewDueOn() {
            return this.getUser.criminalRecordDates.newDueOn;
        },
        getGroups() {
            return this.getUser.groups;
        },
    },
    components: {
        Avatar,
        Tag,
        Divider,
        TertiaryButton,
        GroupCard
    }
})
</script>

