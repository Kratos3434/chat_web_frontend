export interface UserProps {
    id: number,
    email: string,
    username: string,
    verified: boolean,
    profile?: ProfileProps,
    createdAt: Date,
    updatedAt?: Date
}

export interface ProfileProps {
    id: number,
    userId: number,
    user: UserProps,
    createdAt: Date,
    updatedAt?: Date
}