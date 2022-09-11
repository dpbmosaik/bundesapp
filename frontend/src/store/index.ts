import { defineStore } from 'pinia'
import DummyDBEntry from '@/types/DummyDBEntry'
import dummyTestDB from '@/mixins/dummyTestDB'
import { allGroupTypes } from '@/types/GroupDBEntry'
import dummyGroupDB from '@/mixins/dummyGroupDB'

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
    isAuth: true,
    loggedInUserId: '1',
    selectedGroup: '',
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
    selectGroup(groupId: string) {
      this.selectedGroup = groupId;
    },
    clearSelectedGroup() {
      this.selectedGroup = '';
    }
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
    getSelectedGroup: (state) => {
      return state.selectedGroup
    },
    groupIsSelected: (state) => {
      return !!state.selectedGroup 
    },
    getUserById: (state) => {
      if (dummyTestDB.methods !== undefined) {
        const method = dummyTestDB.methods;
        return (userId: string) => method.getUserSafely(userId);
      }
    },
    getUserListsById: (state) => {
      if (dummyTestDB.methods !== undefined) {
        const method = dummyTestDB.methods;
        return (userIds: string[]) => method.getUserListsById(userIds);
      }
    },
    getgroupById: (state) => {
      if (dummyGroupDB.methods !== undefined) {
        const method = dummyGroupDB.methods;
        return (groupId: string) => method.getGroupDBEntry(groupId);
      }
    },
    getgroupsByIdList: (state) => {
      if (dummyGroupDB.methods !== undefined) {
        const method = dummyGroupDB.methods;
        return (idList: string[]) => {
          const groups = []
          for (const id of idList) {
            groups.push(method.getGroupDBEntry(id))
          }
          return groups
        };
      }
    },
    isAuth() {
      return true
    },
    getAllUserIds(): string[] {
        return dummyTestDB.methods?.getAllUserIds() as string[];
    },
    getAllGroupIds(): string[] {
        return dummyGroupDB.methods?.getAllGroupIds() as string[];
    },
    getAllUsersLength(): number {
      return this.getAllUserIds.length;
    },
    getAllGroupsLength(): number {
      return this.getAllGroupIds.length;
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
    getAllGroups(): Array<allGroupTypes> {
      const groupIds = this.getAllGroupIds;
      const groups: Array<allGroupTypes> = [];
      if (groupIds) {
        for (const groupId of groupIds) {
            if (groupId === "fehlerGroup") {
                continue;
            }
            const group = dummyGroupDB.methods?.getGroupDBEntry(groupId);
            if (group === null || group === undefined) {
                //todo error handling
                continue;
            }
            groups.push(group);
        }
      }
      return groups;
    },
    getLoggedInUserId: (state) => {
      return state.loggedInUserId
    },
    getLoggedInUserData: (state) => {
      //if (dummyTestDB.methods) {
        const method = dummyTestDB.methods;
        const loggedInUserId = state.loggedInUserId
        return () => method!.getUserSafely(loggedInUserId);
      //}
    },
  },
})
