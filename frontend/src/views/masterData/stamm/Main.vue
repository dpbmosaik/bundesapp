<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card
        outlined
        elevation="3"
        fluid
        justify="center"
        max-width="40%"
        min-width="400"
        class="pa-4"
      >
        <v-container fluid>
          <v-row justify="center">
            <h2 class="ma-4">Melde dich bei der Bundesapp an!</h2>
            <p class="ma-2" style="color: #b8bcca">
              Die Bundesapp ist ein Service des Deutschen Pfafinderbundes Mosaik
            </p>
          </v-row>
          <v-row class="pa-3">
            <v-text-field filled dense label="Benutzername"> </v-text-field>
          </v-row>
          <v-row class="pt-3 px-3">
            <v-text-field filled append-icon="mdi-eye-off" label="Passwort">
            </v-text-field>
          </v-row>
          <v-row justify="center">
            <v-btn
              large
              block
              depressed
              style="background-color: #0048d9; color: white"
              >
              Anmelden
            </v-btn
            >
          </v-row>
          <v-row justify="center">
            <v-divider class="my-6"></v-divider>
          </v-row>
          <v-row justify="center">
            <v-btn large block outlined>
              Account Erstellen
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scope>
</style>