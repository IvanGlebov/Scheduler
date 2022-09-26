export type Privileges = Array<'view' | 'edit' | ''>

export type UserPrivileges = {
    userId: number,
    privileges: Privileges
}

export type UserPrivilegesAction = UserPrivileges & {
    groupId: number
}

export type UsersPrivileges = {
    ids: number[],
    entities: {
        [key: number]: UserPrivileges
    }
}

export type Group = {
    id: number,
    name: string,
    usersIds: number[],
    groupsTasksIds: number[],
    ownersIds: number[],
    usersPrivileges: UsersPrivileges
}
