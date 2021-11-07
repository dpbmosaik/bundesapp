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
              <v-img
                contain
                width="170px"
                :src="logoPath"
                alt="Logo des VNR Verlags"
              />
            </router-link>
          </v-col>
          <v-col />
        </v-row>
      </v-container>
      <v-list nav>
        <v-list-group
          v-for="item in filteredItems"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
          :value="$route.path.includes(item.module)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
            :to="{ name: child.link }"
          >
            <v-list-item-icon>
              <v-icon small color="primary"> mdi-folder-star-multiple </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
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
    ...mapGetters(["signedIn", "user", 'language']),
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    filteredItems() {
      return this.items;
    },
    logoPath() {
      if (process.env.VUE_APP_ENV === 'dev') {
        return require('@/assets/dpbmLogo.gif');
      }
      return require('@/assets/dpbmLogo.gif');
    },
  },
  created() {
    document.title = "Data UI- Plattform-X";
  },
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
      items: [
        {
          action: "mdi-airplane-landing",
          signedIn: true,
          active: true,
          title: "Startseite",
          module: 'landing',
          items: [
            {
              title: "Startseite",
              link: "LandingStartMain",
            },
          ],
        },
        {
          action: "mdi-account",
          signedIn: true,
          active: true,
          title: "Anmelden",
          module: 'signIn',
          items: [
            {
              title: "Erstanmeldung",
              link: "SignInCreateAccountMain",
            },
            {
              title: "Änderung",
              link: "SignInUpdateAccountMain",
            },
          ],
        },
        {
          action: "mdi-database",
          signedIn: true,
          active: true,
          title: "Master Data",
          module: 'ngw',
          items: [
            {
              title: "Stamm",
              link: "MasterDataStammMain"
            },
            {
              title: "Ring",
              link: "MasterDataRingMain"
            },
          ],
        },
        {
          action: "mdi-database",
          signedIn: true,
          active: true,
          title: "Über uns",
          module: 'about',
          items: [
            {
              title: "Kontakt",
              link: "AboutContactMain"
            },
            {
              title: "Impressum",
              link: "AboutImpressumMain"
            },
            {
              title: "Datenschutz",
              link: "AboutPrivacyMain"
            },
          ],
        },
      ],
    };
  },
  methods: {
    hasRole(role) {
      if (role.includes("All")) {
        return true;
      }
      if (!this.user || !this.user["custom:group"]) {
        return false;
      }
      return this.user["custom:group"].includes(role);
    },
    filterRoles(itemArray) {
      const roles = itemArray[0].roles;
      if (!roles) {
        return itemArray;
      }
      return itemArray.filter((item) =>
        item.roles.some((role) => this.hasRole(role))
      );
    },
  },
};
</script>
