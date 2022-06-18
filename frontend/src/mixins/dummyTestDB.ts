import { defineComponent } from "vue";
import DummyDBEntry from "@/types/DummyDBEntry";

const dummyTestDB: { [key: string]: DummyDBEntry } = {
  fehlerUser: {
    userId: "fehlerUser",
    fahrtenName: "Fehler",
    firstName: "Fehler",
    lastName: "Fehler",
    stamm: "Fehler",
    roles: [],
    avatarURL: "",
  },
  "0": {
    userId: "0",
    fahrtenName: "Herkules",
    firstName: "Wolfgang",
    lastName: "Johannisburgers",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "1": {
    userId: "1",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "2": {
    userId: "2",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung", "Meutenführer_in"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "3": {
    userId: "3",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "4": {
    userId: "4",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "5": {
    userId: "5",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "6": {
    userId: "6",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
  "7": {
    userId: "7",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
  },
};

export default defineComponent({
  methods: {
    hasUserDBEntry(userId: string): boolean {
      return dummyTestDB[userId] !== undefined;
    },
    getUserDBEntry(userId: string): DummyDBEntry | null {
      return dummyTestDB[userId] || null;
    },
    getUserSafely(userId: string | undefined): DummyDBEntry {
      const errorUser = dummyTestDB["fehlerUser"];
      if (userId === undefined) {
        return errorUser;
      }
      const wantedUser = dummyTestDB[userId];     
      if (wantedUser === undefined) {
        return errorUser;
      } else {
        return wantedUser;
      }
    },
    buildFullName(user: DummyDBEntry): string {
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
    buildRolesString(user: DummyDBEntry): string {
      return user.roles.join(", ");
    },
    getAllUserIds(): string[] {
      return Object.keys(dummyTestDB);
    },
  },
});
