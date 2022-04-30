import { defineStore } from 'pinia'
import axios from 'axios';

type ScoutOrgaLevel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
};

type GetScoutOrgaLevelsResponse = {
  data: ScoutOrgaLevel[];
};

const versionString =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_VERSION + '-dev'
    : import.meta.env.VITE_APP_VERSION

export const useStore = defineStore('main', {
  state: () => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    scoutOrgaLevels: [] as ScoutOrgaLevel[],
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      console.log('app initialized!')
    },
    async setScoutOrgaLevels() {
      try {
        const { data, status } = await axios.get<GetScoutOrgaLevelsResponse>(
          import.meta.env.VITE_APP_PATH + '/auth/scout-orga-level/',
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
    
        console.log(JSON.stringify(data, null, 4));
    
        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        this.scoutOrgaLevels = JSON.parse(JSON.stringify(data, null, 4));
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    }
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },
    getScoutOrgaLevels: (state) => {
      return state.scoutOrgaLevels
    }
  },
})
