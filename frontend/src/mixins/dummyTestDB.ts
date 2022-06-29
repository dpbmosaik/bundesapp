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
    email: 'Fehler',
    phone: 'Fehler',
    address: {
      street: 'Fehler',
      number: 'Fehler',
      city: 'Fehler',
      code: 'Fehler',
      addition: 'Fehler'
    },
    bundespostDigital: true,
    gender: 'diverse',
    birthdate: 'Fehler',
    groups: [],
    criminalRecordDates: {
      lastValidIssued: 'Fehler',
      inspection: 'Fehler',
      newDueOn: 'Fehler'
    }
  },
  "0": {
    userId: "0",
    fahrtenName: "Herkules",
    firstName: "Wolfgang",
    lastName: "Johannisburgers",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: 'c/o Bauer'
    },
    bundespostDigital: true,
    gender: 'male',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "1": {
    userId: "1",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: 'c/o Bauer'
    },
    bundespostDigital: true,
    gender: 'male',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "2": {
    userId: "2",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung", "Meutenführer_in"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: ''
    },
    bundespostDigital: true,
    gender: 'male',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "3": {
    userId: "3",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: ''
    },
    bundespostDigital: false,
    gender: 'female',
    birthdate: '01.10.1997',
    groups: ['6'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "4": {
    userId: "4",
    fahrtenName: "",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: ''
    },
    bundespostDigital: false,
    gender: 'diverse',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "5": {
    userId: "5",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: ''
    },
    bundespostDigital: false,
    gender: 'diverse',
    birthdate: '01.10.1997',
    groups: ['1'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "6": {
    userId: "6",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: ''
    },
    bundespostDigital: false,
    gender: 'male',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
  "7": {
    userId: "7",
    fahrtenName: "Schlumpf",
    firstName: "Lindsay",
    lastName: "Walton",
    stamm: "Silberfüchse",
    roles: ["Stammesführer_in", "Sippenführer_in", "Referent_in der Bundesführung"],
    avatarURL: getPlaceholderAvatar(),
    email: 'herkules@bundesapp.org',
    phone: '+49 123 456789',
    address: {
      street: 'Liebigstraße',
      number: '4',
      city: 'Köln',
      code: '12345',
      addition: 'c/o Bauer'
    },
    bundespostDigital: false,
    gender: 'male',
    birthdate: '01.10.1997',
    groups: ['1', '6', '8'],
    criminalRecordDates: {
      lastValidIssued: '13.05.2021',
      inspection: '15.05.2021',
      newDueOn: '12.05.2023'
    }
  },
};

function getPlaceholderAvatar() {
  const firstName = 'John';
  const lastName = 'Doe';
  const size = '128';
  return `https://ui-avatars.com/api/?background=3B3B3B&color=fff&size=${size}&name=${firstName}+${lastName}`
}

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
      return Object.keys(dummyTestDB).filter(key => key != 'fehlerUser');
    },
    getUserListsById(userIds: string[]) {
      let userArray = [];
     
      for (const userId of userIds) {
        let user = this.getUserSafely(userId);
        userArray.push({
          id: userId,
          name: this.buildFullName(user),
          avatar: user.avatarURL
        })
      }
      return userArray
    }
  },
});
