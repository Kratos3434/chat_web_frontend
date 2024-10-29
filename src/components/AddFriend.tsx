'use client'

import { Close } from "@mui/icons-material";
import SendFriendRequest from "./SendFriendRequest";

const AddFriend = () => {
    return (
        <div className="w-full p-[8px] h-full">
            <SendFriendRequest />
            <div className="w-full h-full bg-black text-white my-[16px] rounded-md px-[8px]">
                <p className="text-center">Suggested</p>
                <div className="py-[8px]">
                    <p className="text-center">No suggestions</p>
                </div>
            </div>
        </div>
    );
}

export default AddFriend;