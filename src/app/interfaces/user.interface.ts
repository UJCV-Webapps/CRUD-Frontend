export interface UserInfinite {
    users: User[],
    loading: boolean,
    page: number
}

export interface User {
    name: string,
    title: string,
    picture?: string
}