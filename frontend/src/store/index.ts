import { defineStore } from 'pinia'
import DummyDBEntry from '@/types/DummyDBEntry'
import dummyTestDB from '@/mixins/dummyTestDB'

const versionString =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_VERSION + '-dev'
    : import.meta.env.VITE_APP_VERSION

export const useStore = defineStore('main', {
  state: () => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    selectedMembers: [] as string[],
    membersChecked: false
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      console.log('app initialized!')
    },
    updateSelectedMembers(userId: string) {
      if (this.selectedMembers.includes(userId)) {          
        this.selectedMembers.splice(this.selectedMembers.indexOf(userId), 1);
      } else {
        this.selectedMembers.push(userId);
      }
    },
    clearSelectedMembers() {
      this.selectedMembers = [];
    },
    selectAllMembers() {
      const allMembers = this.getAllUserIds;
      this.selectedMembers = this.selectedMembers.concat(allMembers.filter((item) => this.selectedMembers.indexOf(item) < 0));
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },
    checkIfMemberIsSelected: (state) => {
      return (userId: string) => state.selectedMembers.includes(userId);
    },
    getSelectedMembers: (state) => {
      return state.selectedMembers
    },
    getSelectedMembersLength: (state) => {
      return state.selectedMembers.length
    },
    getUserById: (state) => {
      if (dummyTestDB.methods !== undefined) {
        const method = dummyTestDB.methods;
        return (userId: string) => method.getUserSafely(userId);
      }
    },
    isAuth() {
      return true
    },
    getAllUserIds(): string[] {
        return dummyTestDB.methods?.getAllUserIds() as string[];
    },
    getAllUsersLength(): number {
      return this.getAllUserIds.length;
    },
    getAllUsers(): DummyDBEntry[] {
      const userIds = this.getAllUserIds;
      const users: DummyDBEntry[] = [];
      if (userIds) {
        for (const userId of userIds) {
            if (userId === "fehlerUser") {
                continue;
            }
            const user = dummyTestDB.methods?.getUserDBEntry(userId);
            if (user === null || user === undefined) {
                //todo error handling
                continue;
            }
            users.push(user);
        }
      }
      return users;
  },
  },
})
