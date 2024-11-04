'use client'
import { sendFriendRequest } from "@/controller/user";
import { Close } from "@mui/icons-material";
import { useState } from "react";

interface Props {
    token?: string
}

const SendFriendRequest = ({token}: Props) => {
    const [openMessage, setOpenMessage] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername]= useState("");
    const [loading, isLoading] = useState(false);

    const handleSendFriendRequest = async (e: any) => {
        e.preventDefault();
        setOpenMessage(false);
        setError("");
        isLoading(true);
        try {
            await sendFriendRequest(username, token);
        } catch (err: any) {
            setError(err);
        }
        isLoading(false);
        setOpenMessage(true);
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="max-w-[500px] w-full rounded-full p-[8px] bg-black">
                <form className="flex items-center gap-2" onSubmit={handleSendFriendRequest}>
                    <input type="text" placeholder="Enter your friend's username" className="w-full bg-white outline-none rounded-full p-[8px]" 
                    onChange={(e) => setUsername(e.target.value)} />
                    <button className={`p-[8px] rounded-full bg-indigo-500 text-nowrap text-white hover:brightness-95 ${loading && "cursor-not-allowed"}`} disabled={loading}>
                        Add friend
                    </button>
                </form>
            </div>
            {
                openMessage &&
                (
                    <div className="bg-black px-[16px] flex items-center gap-5">
                        {
                            error ?
                            (
                                <p className="text-red-500">{error}</p>
                            ):
                            (
                                <p className="text-green-500">Friend request sent!</p>
                            )
                        }
                        <div className="cursor-pointer" onClick={() => setOpenMessage(false)}>
                            <Close color="primary" />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SendFriendRequest;