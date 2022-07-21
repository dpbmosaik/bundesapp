export default interface DummyDBEntry {
    userId: string;
    fahrtenName: string;
    firstName: string;
    lastName: string;
    stamm: string;
    roles: string[];
    avatarURL: string;
    email: string;
    phone: string;
    address: {
      street: string;
      number: string;
      city: string;
      code: string;
      addition: string;
    }
    bundespostDigital: boolean;
    gender: 'male' | 'female' | 'diverse';
    birthdate: string;
    groups: string[];
    criminalRecordDates: {
      lastValidIssued: string;
      inspection: string;
      newDueOn: string
    },
    passwordExpiration: string,
    allergies: string[],
    favoriteGroups: string[]
};