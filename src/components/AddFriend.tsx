'use client'
import SendFriendRequest from "./SendFriendRequest";

interface Props {
    token?: string
}

const AddFriend = ({token}: Props) => {
    return (
        <div className="w-full p-[8px] h-full">
            <SendFriendRequest token={token} />
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