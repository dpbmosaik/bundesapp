<template slot="append">
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="grey" dark v-bind="attrs" v-on="on">
        mdi-alert-circle-outline
      </v-icon>
    </template>
    <span>
      {{text}}
    </span>
  </v-tooltip>
</template>

<script>
export default {
  props: ['text'],
};
</script>

<style scoped></style>
