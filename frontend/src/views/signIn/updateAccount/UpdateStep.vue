<template>
  <div>
    <create-single-person-dialog>
        ref="createSinglePersonDialog"
    </create-single-person-dialog>
  </div>
</template>

<script>
import CreateSinglePersonDialog from "../createAccount/initalDataStep.vue"

export default {
    data: () => ({
        name: "Robert",
        adresse: "mond",
        loading: false,
        selection: 1,
    }),
    components: {
        CreateSinglePersonDialog,
    },
    methods: {
        change() {
            this.createSinglePersonDialog.openDialog();
        },
    }
}
</script>

<style>

</style>