export default interface RegisterRequest {
    userId: string;
    fahrtenName: string;
    firstName: string;
    lastName: string;
    stamm: string;
    stammesgroup: string;
    email: string;
    phone: string;
    address: {
      street: string;
      number: string;
      city: string;
      code: string;
      addition: string;
    },
    dateOfRegistration: string
};