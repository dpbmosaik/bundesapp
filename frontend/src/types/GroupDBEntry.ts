interface GroupDBEntry {
    groupId: string;
    name: string;
    groupAvatar: string;
    lastEditedAt: string;
    lastEditedByUser: string;
    createdAt: string;
    createdByUser: string;
    subGroups: string[];
    superGroups: string[];
    groupMember: string[];
    emailAlias: {
        enabled: Boolean
        emails: string[]
    }
    linkToCloud: {
        enabled: Boolean
        url: string
    }
    linkToWiki: {
        enabled: Boolean
        url: string
    }
    linkToChat: {
        enabled: Boolean
        url: string
    }
    linkToMiro: {
        enabled: Boolean
        url: string
    }
};

export interface BundesinfrastrukturType extends GroupDBEntry {
    leader: string[]
    deputies: string[]
    headOfFinance: string[]
    type: 'Stamm' | 'Aufbaustamm' | 'Horst' | 'Ring' | 'Aufbauring'
}

export interface StammesgruppeType extends GroupDBEntry {
    leader: string[]
    type: 'Meute' | 'Sippe' | 'Rudel' | 'Trupp' | 'Roverrunde'
}

export interface IndividualGroupType extends GroupDBEntry {
    editAccessUsers: string[]
    type: 'Individuell'
}

export interface RoleGroupType extends GroupDBEntry {
    roles: string[]
    editAccessRoles: string[]
    type: 'Rollen'
}

export interface eventType extends GroupDBEntry {
    // tbd
}

export type allGroupTypes = RoleGroupType | IndividualGroupType | StammesgruppeType | BundesinfrastrukturType