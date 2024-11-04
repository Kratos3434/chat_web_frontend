'use client'

import { acceptFriendRequest, getAllFriendRequests } from "@/controller/user";
import { CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
    token?: string
}

const FriendRequestsList = ({ token }: Props) => {
    const [loading, isLoading] = useState(false);
    const queryClient = useQueryClient();

    const { status, data } = useQuery({
        queryKey: ['friend-requests'],
        queryFn: async () => getAllFriendRequests(token)
    });

    const handleAcceptFriendRequest = async (senderId: number) => {
        isLoading(true);
        try {
            await acceptFriendRequest(senderId, token);
            await queryClient.invalidateQueries(['friend-requests']);
            await queryClient.invalidateQueries(['friends']);
        } catch (err: any) {
            console.error(err);
        }
    }

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
                                        <p>No friend requests yet</p>
                                    </div>
                                ) :
                                (
                                    data.map((e, idx) => {
                                        return (
                                            <div className="flex justify-between items-center p-[8px] bg-indigo-500 rounded-md" key={idx}>
                                                <p>
                                                    {e.sender.user.username}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <button className={`rounded-md bg-green-500 px-[8px] hover:brightness-95 ${loading && "cursor-not-allowed"}`} disabled={loading} onClick={() => handleAcceptFriendRequest(e.senderId)}>
                                                        Accept
                                                    </button>
                                                    <button className={`rounded-md bg-red-500 px-[8px] hover:brightness-95 ${loading && "cursor-not-allowed"}`} disabled={loading}>
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                        )
                    }
                </div>
            )
    );
}

export default FriendRequestsList;