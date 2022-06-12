import axios from 'axios';

export default {
    user: {
        authenticated: false,
    },

    interceptorsSetup(store) {
        axios.interceptors.request.use((config) => {
            const {accessToken} = store.state;
            console.log(`accestoken is: ${accessToken}`);
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`; // eslint-disable-line no-param-reassign
            }
            return config;
        }, (err) => Promise.reject(err));
    },
};
