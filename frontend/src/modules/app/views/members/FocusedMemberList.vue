
<template lang="">
    <div class="flex flex-col h-full justify-between">
        <div class="flex flex-col gap-4">
            <div class="flex flex-row flex-wrap gap-2">
                <Tag 
                    v-for="(user, index) in store.getSelectedMembers"
                    :key="index"
                    class="bg-proto-darkgrey text-white w-fit"
                >
                    {{ buildFullName(store.getUserById(user)) }}
                </Tag>
            </div>
            <TertiaryButton :target="() => store.clearSelectedMembers()" icon="delete">Alle Entfernen</TertiaryButton>
        </div>
        <div class="flex flex-row flex-wrap gap-8">
            <TertiaryButton :target="getEmailString()" icon="message">Email schreiben</TertiaryButton>
            <TertiaryButton :target="getChatLink()" icon="chat">Anschreiben</TertiaryButton>
            <TertiaryButton :target="() => copyMails()" icon="moreSqaure">Emails kopieren</TertiaryButton>
            <TertiaryButton :target="() => exportAdresses()" icon="ticketStar">Adressen exportieren</TertiaryButton>
        </div>
    </div>
</template>


<script lang="ts">
import Tag from "@/components/tag/Tag.vue";
import TertiaryButton from "@/components/button/TertiaryButton.vue";

export default defineComponent({
    setup() {
        const store = useStore()
        return { store }
    },
    components: {
        Tag,
        TertiaryButton
    },
    methods: {
        buildFullName(user: {firstName: string, fahrtenName: string, lastName: string}) {
            let name = "";
            if (user.firstName !== undefined) {
                name += user.firstName;
            }
            if (user.fahrtenName !== "") {
                name += ' "' + user.fahrtenName + '"';
            }
            if (user.lastName !== undefined) {
                name += " " + user.lastName;
            }
            return name;
        },
        exportAdresses() {
            alert('Exported');
        },
        getEmailString() {
            const start = "mailto:";
            const mails: string[] = [];
            const selectedMembers: string[] = this.store.getSelectedMembers;
            selectedMembers.forEach(userId  => {
                const user = this.store.getUserById!(userId);
                mails.push(user.email);
            });
            const mailstring = mails.join(';');           
            return start + mailstring
        },
        getChatLink() {
            return "https://dpbm.de"
        },
        async copyMails() {
            try {
                const mails: string[] = [];
                const selectedMembers: string[] = this.store.getSelectedMembers;
                selectedMembers.forEach(userId  => {
                    const user = this.store.getUserById!(userId);
                    mails.push(user.email);
                });
                const mailstring = mails.join(';');
                await navigator.clipboard.writeText(mailstring);
                alert('Copied');
            } catch($e) {
                alert('Cannot copy');
            }
        }
    },
})
</script>
