export type User = {
    id: number,
    name: string,
    loggedIn?: boolean,
    status: 'idle' | 'fetching' | 'initial' | 'fetched' | 'deprecated' | 'rejected' | 'pending' | 'registered',
    email?: string,
    groupId?: number | undefined,
    message?: string
}

export type credentials = {
    login: string,
    password: string
}
