import { defineComponent } from "vue";
import { allGroupTypes } from "@/types/GroupDBEntry";

const dummyGroupDB: { [key: string]: allGroupTypes } = {
  "fehlerGroup": {
    groupId: 'fehlerGroup',
    name: 'fehlerGroup',
    groupAvatar: '',
    lastEditedAt: 'Fehler',
    lastEditedByUser: 'Fehler',
    createdAt: 'Fehler',
    createdByUser: 'Fehler',
    subGroups: [],
    superGroups: [],
    groupMember: [],
    emailAlias: {
        enabled: false,
        emails: []
    },
    linkToCloud: {
        enabled: false,
        url: ''
    },
    linkToWiki: {
        enabled: false,
        url: ''
    },
    linkToChat: {
        enabled: true,
        url: ''
    },
    linkToMiro: {
        enabled: true,
        url: ''
    },
    leader: ['fehlerUser'],
    deputies: ['fehlerUser'],
    headOfFinance: ['fehlerUser'],
    type: 'Stamm'
  },
  "0": {
    groupId: '0',
    name: 'Hellas',
    groupAvatar: getPlaceholderAvatar(),
    lastEditedAt: '23.06.2022',
    lastEditedByUser: 'Linda Hohlweg',
    createdAt: '20.06.2022',
    createdByUser: 'Linda Hohlweg',
    subGroups: ['2'],
    superGroups: ['1'],
    groupMember: ['1', '2', '3', '4'],
    emailAlias: {
        enabled: true,
        emails: ['hellas@bundesapp.org']
    },
    linkToCloud: {
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToWiki: {
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToChat: {
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToMiro: {
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    leader: ['0'],
    deputies: ['3', '4', '5'],
    headOfFinance: ['6'],
    type: 'Stamm'
  },
  "1": {
    groupId: '1',
    name: 'Köln',
    groupAvatar: getPlaceholderAvatar(),
    lastEditedAt: '23.06.2022',
    lastEditedByUser: 'Linda Hohlweg',
    createdAt: '20.06.2022',
    createdByUser: 'Linda Hohlweg',
    subGroups: ['0'],
    superGroups: [],
    groupMember: [],
    emailAlias: {
        enabled: false,
        emails: []
    },
    linkToCloud: {
        enabled: false,
        url: ''
    },
    linkToWiki: {
        enabled: false,
        url: ''
    },
    linkToChat: {
        enabled: false,
        url: ''
    },
    linkToMiro: {
        enabled: false,
        url: ''
    },
    leader: ['0'],
    deputies: ['3', '4', '5'],
    headOfFinance: ['6'],
    type: 'Ring'
  },
  "2": {
    groupId: '2',
    name: 'Pan',
    groupAvatar: getPlaceholderAvatar(),
    lastEditedAt: '23.06.2022',
    lastEditedByUser: 'Linda Hohlweg',
    createdAt: '20.06.2022',
    createdByUser: 'Linda Hohlweg',
    subGroups: [],
    superGroups: ['0'],
    groupMember: ['1', '2', '3', '4', '5'],
    emailAlias: {
        enabled: false,
        emails: []
    },
    linkToCloud: {
        enabled: false,
        url: ''
    },
    linkToWiki: {
        enabled: false,
        url: ''
    },
    linkToChat: {
        enabled: false,
        url: ''
    },
    linkToMiro: {
        enabled: false,
        url: ''
    },
    leader: ['4', '6'],
    type: 'Sippe'
  },
  "3": {
    groupId: '3',
    name: 'Bundesrat',
    groupAvatar: getPlaceholderAvatar(),
    lastEditedAt: '23.06.2022',
    lastEditedByUser: 'Linda Hohlweg',
    createdAt: '20.06.2022',
    createdByUser: 'Linda Hohlweg',
    subGroups: [],
    superGroups: ['0'],
    groupMember: ['1', '2', '3', '4', '5'],
    emailAlias: {
        enabled: false,
        emails: []
    },
    linkToCloud: {
        enabled: false,
        url: ''
    },
    linkToWiki: {
        enabled: false,
        url: ''
    },
    linkToChat: {
        enabled: false,
        url: ''
    },
    linkToMiro: {
        enabled: false,
        url: ''
    },
    roles: ['Sippenführer_in'],
    editAccessRoles: [],
    type: 'Rollen'
  },
  "4": {
    groupId: '4',
    name: 'haddak',
    groupAvatar: getPlaceholderAvatar(),
    lastEditedAt: '23.06.2022',
    lastEditedByUser: 'Linda Hohlweg',
    createdAt: '20.06.2022',
    createdByUser: 'Linda Hohlweg',
    subGroups: [],
    superGroups: ['0'],
    groupMember: ['1', '2', '3', '4', '5'],
    emailAlias: {
        enabled: false,
        emails: []
    },
    linkToCloud: {
        enabled: false,
        url: ''
    },
    linkToWiki: {
        enabled: false,
        url: ''
    },
    linkToChat: {
        enabled: false,
        url: ''
    },
    linkToMiro: {
        enabled: false,
        url: ''
    },
    editAccessUsers: ['5', '6'],
    type: 'Individuell'
  },
};

function getPlaceholderAvatar() {
    const name = 'Hellas';
    const size = '148';
    return `https://ui-avatars.com/api/?background=3B3B3B&color=fff&size=${size}&name=${name}&font-size=0.33`
}

export default defineComponent({
  methods: {
    hasGroupDBEntry(groupId: string): boolean {
        return dummyGroupDB[groupId] !== undefined;
    },
    getGroupDBEntry(groupId: string | undefined): allGroupTypes {
        const errorGroup = dummyGroupDB["fehlerGroup"];
        if (groupId === undefined) {
            return errorGroup;
        }
        const wantedUser = dummyGroupDB[groupId];     
        if (wantedUser === undefined) {
            return errorGroup;
        } else {
            return wantedUser;
        }
    },
    getAllGroupIds(): string[] {
        return Object.keys(dummyGroupDB).filter(key => key != 'fehlerGroup');
    },
  },
});
