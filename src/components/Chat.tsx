'use client'

import { getSocket } from "@/socket/socket";
import { onlineUsersAtom, userAtom } from "@/store";
import { ProfileProps } from "@/types";
import { Send } from "@mui/icons-material";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface Props {
    username: string,
    profile: ProfileProps
}

const Chat = ({ username, profile }: Props) => {
    const currentUser = useAtomValue(userAtom);
    const onlineUsers = useAtomValue(onlineUsersAtom);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{
        username: string,
        content: string
    }[]>([
        {
            username: profile.user.username,
            content: "Hello"
        },
        {
            username: currentUser?.user.username ?? "",
            content: "Hi"
        }
    ]);

    //Testing
    const handleSendMessage = (e: any) => {
        e.preventDefault();

        setMessages([...messages, {
            username: currentUser?.user.username ?? "",
            content: message
        }])

        getSocket().emit('message', {
            receiverId: profile.id,
            receiverEmail: profile.user.email,
            senderUsername: currentUser?.user.username,
            content: message
        });

    }

    useEffect(() => {
        getSocket().on('newMessage', (data) => {
            console.log(data);
            setMessages([...messages, {
                username: data.senderUsername,
                content: data.content
            }])
        });

        return () => {
            getSocket().off('newMessage');
        }
    }, []);

    return (
        <div className="text-white w-full bg-black rounded-xl px-[16px] py-[8px] flex flex-col">
            <div className="flex items-center my-5 justify-between">
                <div>
                    <p className="text-6xl font-bold">{profile.user.username}</p>
                    <small>{profile.user.email}</small>
                </div>
                <p>
                    Status:{" "}
                    <span className="font-bold">
                        {
                            onlineUsers.get(profile.user.email) === profile.user.email ?
                                (
                                    <span className="text-green-500">Online</span>
                                ) :
                                (
                                    <span className="text-red-500">Offline</span>
                                )
                        }
                    </span>
                </p>
            </div>
            <div className="bg-indigo-500 rounded-xl flex flex-col p-[8px] gap-10 overflow-y-auto h-[1041px] messages">
                {
                    messages.map((e, idx) => {
                        return (
                            e.username === profile.user.username ?
                                (
                                    <div className={`flex justify-start`} key={idx}>
                                        <div className="flex items-start gap-2 text-black">
                                            <img src={currentUser?.picture} width={30} height={30} className="rounded-full border-white border-[1px] bg-black" />
                                            <p className="rounded-xl bg-white p-[8px] max-w-[500px] break-words shadow-xl">
                                                {e.content}
                                            </p>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className={`flex justify-end`} key={idx}>
                                        <div className="flex flex-row-reverse items-start gap-2 text-black">
                                            <img src={currentUser?.picture} width={30} height={30} className="rounded-full border-white border-[1px] bg-black" />
                                            <p className="rounded-xl bg-blue-400 p-[8px] max-w-[500px] break-words shadow-xl">
                                                {e.content}
                                            </p>
                                        </div>
                                    </div>
                                )
                        );
                    })
                }
            </div>
            <form className="flex items-center gap-1 mt-3" onSubmit={handleSendMessage}>
                <input type="text" className="bg-white text-black rounded-full p-[16px] w-full outline-none border-[1px] border-black"
                    placeholder={`Say something to ${username}...`} onChange={(e) => setMessage(e.target.value)} />
                <button disabled={message ? false : true}>
                    <Send fontSize="large" color={message ? "primary" : "inherit"} />
                </button>
            </form>
        </div>
    );
}

export default Chat;