<template>
  <v-app id="app" light>
    <v-app-bar app flat light>
      <Header />
    </v-app-bar>
    <v-navigation-drawer
      :mini-variant.sync="isMobile"
      app
      permanent
      width="300"
      left
      color="#F5C000"
      floating
    >
      <v-container fluid>
        <v-row>
          <v-col> </v-col>
          <v-col>
            <router-link to="/">
              <v-img contain width="170px" :src="logoPath" alt="Bundeslogo" />
            </router-link>
          </v-col>
          <v-col />
        </v-row>
      </v-container>
      <v-list nav>
        <v-list-item
          v-for="item in filteredItems"
          :key="item.title"
          link
          :to="{ name: item.link }"
        >
          <v-list-item-icon>
            <v-icon color="black"> {{ item.action }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main id="lateral">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer style="z-index: 1" absolute app dark color="secondary" />
  </v-app>
</template>

<script>
import Header from "@/components/menu/Header.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["signedIn", "user", "language"]),
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    filteredItems() {
      return this.items;
    },
    logoPath() {
      if (process.env.VUE_APP_ENV === "dev") {
        return require("@/assets/dpbmLogo.gif");
      }
      return require("@/assets/dpbmLogo.gif");
    },
  },
  created() {
    document.title = "BundesApp";
  },
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
      items: [
        {
          action: "mdi-account",
          title: "Anmelden",
          link: "SignInCreateAccountMain",
        },
        {
          action: "mdi-database",
          title: "Stamm",
          link: "MasterDataStammMain",
        },
        {
          action: "mdi-database",
          title: "Ring",
          link: "MasterDataRingMain",
        },
      ],
    };
  },
  methods: {},
};
</script>
