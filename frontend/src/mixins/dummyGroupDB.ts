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
        type: 'fehler',
        enabled: false,
        emails: []
    },
    linkToCloud: {
        type: 'fehler',
        enabled: false,
        url: ''
    },
    linkToWiki: {
        type: 'fehler',
        enabled: false,
        url: ''
    },
    linkToChat: {
        type: 'fehler',
        enabled: true,
        url: ''
    },
    linkToMiro: {
        type: 'fehler',
        enabled: true,
        url: ''
    },
    leader: ['fehlerUser'],
    deputies: ['fehlerUser'],
    headOfFinance: ['fehlerUser'],
    type: 'Stamm',
    groupStatus: 2
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
    superGroups: ['1', '3'],
    groupMember: ['1', '2', '3', '4'],
    emailAlias: {
        type: 'email',
        enabled: true,
        emails: ['hellas@bundesapp.org', 'stammhellas@bundesapp.org', 'hellenen@bundesapp.org']
    },
    linkToCloud: {
        type: 'cloud',
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToWiki: {
        type: 'wiki',
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToChat: {
        type: 'chat',
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    linkToMiro: {
        type: 'miro',
        enabled: true,
        url: 'https://cloud.dpbm.de'
    },
    leader: ['0'],
    deputies: ['3', '4', '5'],
    headOfFinance: ['6'],
    type: 'Stamm',
    groupStatus: 2
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
        type: 'email',
        enabled: false,
        emails: []
    },
    linkToCloud: {
        type: 'cloud',
        enabled: false,
        url: ''
    },
    linkToWiki: {
        type: 'wiki',
        enabled: false,
        url: ''
    },
    linkToChat: {
        type: 'chat',
        enabled: false,
        url: ''
    },
    linkToMiro: {
        type: 'Miro',
        enabled: false,
        url: ''
    },
    leader: ['0'],
    deputies: ['3', '4', '5'],
    headOfFinance: ['6'],
    type: 'Ring',
    groupStatus: 2
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
        type: 'email',
        enabled: false,
        emails: []
    },
    linkToCloud: {
        type: 'cloud',
        enabled: false,
        url: ''
    },
    linkToWiki: {
        type: 'wiki',
        enabled: false,
        url: ''
    },
    linkToChat: {
        type: 'chat',
        enabled: false,
        url: ''
    },
    linkToMiro: {
        type: 'miro',
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
        type: 'email',
        enabled: false,
        emails: []
    },
    linkToCloud: {
        type: 'cloud',
        enabled: false,
        url: ''
    },
    linkToWiki: {
        type: 'wiki',
        enabled: false,
        url: ''
    },
    linkToChat: {
        type: 'chat',
        enabled: false,
        url: ''
    },
    linkToMiro: {
        type: 'miro',
        enabled: false,
        url: ''
    },
    roles: ['Sippenführer_in', 'Meutenführer_in'],
    editAccessRoles: ['Sippenführer_in'],
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
        type: 'email',
        enabled: false,
        emails: []
    },
    linkToCloud: {
        type: 'cloud',
        enabled: false,
        url: ''
    },
    linkToWiki: {
        type: 'wiki',
        enabled: false,
        url: ''
    },
    linkToChat: {
        type: 'chat',
        enabled: false,
        url: ''
    },
    linkToMiro: {
        type: 'miro',
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
        // eslint-disable-next-line security/detect-object-injection
        return dummyGroupDB[groupId] !== undefined;
    },
    getGroupDBEntry(groupId: string | undefined): allGroupTypes {
        const errorGroup = dummyGroupDB["fehlerGroup"];
        if (groupId === undefined) {
            return errorGroup;
        }
        // eslint-disable-next-line security/detect-object-injection
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
