'use client'

import { getAllFriends } from "@/controller/user";
import { onlineUsersAtom, userAtom } from "@/store";
import { Add } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Link from "next/link";

interface Props {
    token?: string
}

const FriendsList = ({ token }: Props) => {
    const user = useAtomValue(userAtom);
    const onlineUsers = useAtomValue(onlineUsersAtom);

    const { status, data } = useQuery({
        queryKey: ['friends'],
        queryFn: async () => getAllFriends(token)
    });

    return (
        status === 'loading' ?
            (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) :
            (
                <div className="flex flex-col">
                    {
                        data &&
                        (
                            data.length === 0 ?
                                (
                                    <div className="flex flex-col">
                                        <p>No friends yet</p>
                                        <Link href="/home/add-friend" className="my-3 w-full bg-indigo-500 text-center rounded-md py-[16px] text-lg font-bold hover:brightness-95 flex items-center justify-center gap-1">
                                            <Add />
                                            <span>Add friend</span>
                                        </Link>
                                    </div>
                                ) :
                                (
                                    data.map((e, idx) => {
                                        return (
                                            <Link href={`/home/chat/${e.friendId === user?.id ? e.friender.user.username : e.friend.user.username}`} key={idx} className="flex p-[8px] items-center bg-gray-500 rounded-md hover:brightness-95 justify-between font-bold">
                                                {
                                                    e.friendId === user?.id ?
                                                    (
                                                        <p>{e.friender.user.username}</p>
                                                    ):
                                                    (
                                                        <p>{e.friend.user.username}</p>
                                                    )
                                                }
                                                {
                                                    e.friendId === user?.id ?
                                                    (
                                                        <p>{onlineUsers.get(e.friender.user.email) === e.friender.user.email ? <span className="text-green-500">online</span> : <span className="text-red-500">offline</span>}</p>
                                                    ):
                                                    (
                                                        <p>{onlineUsers.get(e.friend.user.email) === e.friend.user.email ? <span className="text-green-500">online</span> : <span className="text-red-500">offline</span>}</p>
                                                    )
                                                }
                                            </Link>
                                        )
                                    })
                                )
                        )
                    }
                </div>
            )
    )
}

export default FriendsList;