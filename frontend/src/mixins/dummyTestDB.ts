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
    fahrtenName: "",
    firstName: "Hans",
    lastName: "Peter",
    stamm: "Silberfüchse",
    roles: ["Chef von allem"],
    avatarURL: "",
  },
  "1": {
    userId: "1",
    fahrtenName: "Fahrtenname",
    firstName: "Max",
    lastName: "Mustermann",
    stamm: "Silberfüchse",
    roles: ["A", "B", "C"],
    avatarURL: "",
  },
  "2": {
    userId: "2",
    fahrtenName: "",
    firstName: "Hans",
    lastName: "Peter",
    stamm: "Silberfüchse",
    roles: ["Chef von allem"],
    avatarURL: "",
  },
  "3": {
    userId: "3",
    fahrtenName: "Fahrtenname",
    firstName: "Max",
    lastName: "Mustermann",
    stamm: "Silberfüchse",
    roles: ["A", "B", "C"],
    avatarURL: "",
  },
  "4": {
    userId: "4",
    fahrtenName: "",
    firstName: "Hans",
    lastName: "Peter",
    stamm: "Silberfüchse",
    roles: ["Chef von allem"],
    avatarURL: "",
  },
  "5": {
    userId: "5",
    fahrtenName: "Fahrtenname",
    firstName: "Max",
    lastName: "Mustermann",
    stamm: "Silberfüchse",
    roles: ["A", "B", "C"],
    avatarURL: "",
  },
  "6": {
    userId: "6",
    fahrtenName: "",
    firstName: "Hans",
    lastName: "Peter",
    stamm: "Silberfüchse",
    roles: ["Chef von allem"],
    avatarURL: "",
  },
  "7": {
    userId: "7",
    fahrtenName: "Fahrtenname",
    firstName: "Max",
    lastName: "Mustermann",
    stamm: "Silberfüchse",
    roles: ["A", "B", "C"],
    avatarURL: "",
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
