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
    picture: string,
    userId: number,
    user: UserProps,
    friendRequestsSent: FriendRequestProps[],
    friendRequestsReceived: FriendRequestProps[],
    friends: FriendProps[],
    friender: FriendProps[],
    createdAt: Date,
    updatedAt?: Date
}

export interface FriendRequestProps {
    id: number,
    senderId: number,
    sender: ProfileProps,
    receiverId: number,
    receiver: ProfileProps,
    status: string,
    createdAt: Date,
    updatedAt?: Date
}

export interface FriendProps {
    id: number,
    frienderId: number,
    friender: ProfileProps,
    friendId: number,
    friend: ProfileProps,
    createdAt: Date
}