import { defineStore } from 'pinia'
import DummyDBEntry from '@/types/DummyDBEntry'
import dummyTestDB from '@/mixins/dummyTestDB'
import { allGroupTypes } from '@/types/GroupDBEntry'
import dummyGroupDB from '@/mixins/dummyGroupDB'

export const useStore = defineStore('main', () => {
    const selectedMembers = ref<string[]>([]);
    const loggedInUserId = ref('1');
    const selectedGroup = ref('');
    const isInitialized = ref(false);
    const isAuth = ref(false);

    //todo
    //? for what do you need isInitialized?
    //? - " - isAuth?

    //? why is this negated?
    const isReady = computed(() => !isInitialized);
    const getSelectedMembers = computed(() => selectedMembers.value);
    const getSelectedMembersLength = computed(() => selectedMembers.value.length)
    const getSelectedGroup = computed(() => selectedGroup.value);
    const groupIsSelected = computed(() => !!selectedGroup.value);
    
    function getUserListsById (userIds: string[]) {
        if (dummyTestDB.methods !== undefined) {
            const method = dummyTestDB.methods;
            return method.getUserListsById(userIds);
        }
    }

    function getgroupById (groupId: string) {
        if (dummyGroupDB.methods !== undefined) {
            const method = dummyGroupDB.methods;
            return method.getGroupDBEntry(groupId);
        }
    }

    function getgroupsByIdList (idList: string[]) {
        if (dummyGroupDB.methods === undefined) {
            return undefined;
        }
        const method = dummyGroupDB.methods;
        return idList.map((item) => method.getGroupDBEntry(item));
    }

     
    
    function getUserById (userId: string) {
        if (dummyTestDB.methods !== undefined) {
            const method = dummyTestDB.methods;
            return method.getUserSafely(userId); 
        }
    }

    function initApp () {
        isInitialized.value = true;
        console.log('app initialized')
    }

    function updateSelectedMembers (userId: string) {
        if (selectedMembers.value.includes(userId)) {
            selectedMembers.value.splice(selectedMembers.value.indexOf(userId), 1);
        } else {
            selectedMembers.value.push(userId);
        }
    }

    function clearSelectedMembers () {
        selectedMembers.value = [];
    }

    function selectAllMembers () {
        const allMembers = allUserIds;
        selectedMembers.value = selectedMembers.value.concat(allUserIds.filter(item => selectedMembers.indexOf(item) < 0));
    }

    function selectGroup (groupId: string) {
        selectedGroup.value = groupId;
    }

    function clearSelectedGroup () {
        selectedGroup.value = '';
    }

    function checkIfMemberIsSelected (userId: string): boolean {
        return selectedMembers.value.includes(userId);
    }

    return {debug, version, selectedMembers, loggedInUserId, selectedGroup, isInitialized, isAuth};

});


const a = ({
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
