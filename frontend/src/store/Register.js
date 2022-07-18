export default RegisterModule = {
    state: () => ({
        register: {
            firstname: '',
            lastname: '',
            scoutname: '',
            email: '',
            stamm: '',
            group: '',
            birthdate: '',
            gender: '',
            street: '',
            zipCode: '',
            additional: '',
            phone: '',
            password: '',
            stepsDone: {
              step1: false,
              step2: false,
              step3: false,
              step4: false,
              step5: false,
              step6: false,
            }
          },
    }),
    mutations: {
        setRegisterFirstName(state, payload) {
            state.register.firstname = payload.firstname
          },
          setRegisterLastName(state, payload) {
            state.register.lastname = payload.lastname
          },
          setRegisterScoutName(state, payload) {
            state.register.scoutname = payload.scoutname
          },
          setRegisterEmail(state, payload) {
            state.register.email = payload.email
          },
          changeStateOfFirstStep(state, payload) {
            state.register.stepsDone.step1 = payload.value
          },
    },
    getters: {
        
    }
  }