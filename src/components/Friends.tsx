'use client'

import { useState } from "react";
import FriendsList from "./FriendsList";
import FriendRequestsList from "./FriendRequestsList";

interface Props {
    token?: string
}

const Friends = ({token}: Props) => {
    const [currentList, setCurrentList] = useState('all');
    
    return (
        <div className="h-full pp-[8px] max-w-[300px] w-full">
        <div className="p-[16px] bg-black h-full rounded-md text-white">
            <p className="font-bold text-xl border-b-[1px] border-white pb-2">Friends {`(${currentList})`}</p>
            <div className="flex w-full justify-between items-center text-center py-1 gap-1">
                <button className={`flex flex-1 w-full justify-center ${currentList === 'all' ? "bg-indigo-500" : "hover:bg-indigo-500"} rounded-md cursor-pointer`} 
                onClick={() => setCurrentList('all')}>
                    All
                </button>
                <button className={`flex flex-1 w-full justify-center ${currentList === 'requests' ? "bg-indigo-500" : "hover:bg-indigo-500"} rounded-md cursor-pointer`} 
                onClick={() => setCurrentList('requests')}>
                    Requests
                </button>
            </div>
            <div className="pt-3">
                {currentList === 'all' ? <FriendsList token={token} /> : <FriendRequestsList token={token} />}
            </div>
        </div>
    </div>
    )
}

export default Friends;