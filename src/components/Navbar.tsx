'use client'

import { getSocket } from "@/socket/socket";
import { userAtom } from "@/store";
import { AccountCircle, ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    // const [user, setUser] = useAtom(userAtom);
    // const [expand, setExpand] = useState(false);

    // const handleLogout = async () => {
    //     await fetch("/internal_api/logout", {
    //         method: 'DELETE'
    //     });
    //     getSocket().disconnect();
    //     setUser(undefined);
    //     setExpand(false);
    // }

    return (
        <nav className="fixed top-0 left-0 w-full p-[16px] shadow-xl bg-black h-[70px] flex justify-center items-center">
            <Link href="/" className="absolute left-[16px]">
                <p className="font-bold text-5xl">
                    <span className="text-red-500">
                        Pi
                    </span>
                    {" "}
                    <span className="text-white">
                        Chat
                    </span>
                </p>
            </Link>

            <div className="absolute right-[16px] flex items-center text-white gap-5">
                {/* {
                    user ?
                        (
                            <div className="rounded-md bg-indigo-500 p-[16px] cursor-pointer hover:brightness-95 flex items-center gap-3"
                                onClick={() => setExpand(!expand)}>
                                {expand ? <ExpandLess /> : <ExpandMore />}
                                <p className="text-lg">Hi, <b>{user.user.username}</b></p>
                            </div>
                        ) :
                        (
                            <>
                                <Link href="/signup" className="hover:text-indigo-500">
                                    Sign up
                                </Link>
                                <Link href="/signin" className="p-[8px] px-[16px] rounded-md bg-indigo-500 hover:brightness-95">
                                    Log in
                                </Link>
                            </>
                        )
                } */}
                <Link href="/signup" className="hover:text-indigo-500">
                    Sign up
                </Link>
                <Link href="/signin" className="p-[8px] px-[16px] rounded-md bg-indigo-500 hover:brightness-95">
                    Log in
                </Link>
            </div>
            {/** Dropdown menu */}
            {/* {
                expand &&
                (
                    <div className="absolute top-[60px] right-[16px] px-[8px] py-[16px] shadow-xl bg-white max-w-[188px] w-full z-[-1] rounded-b-md flex flex-col gap-2">
                        <Link href="/" className="p-[8px] flex items-center text-xl font-bold gap-3 rounded-md bg-indigo-500 text-white hover:brightness-95">
                            <AccountCircle />
                            <p>
                                Profile
                            </p>
                        </Link>
                        <button className="p-[8px] flex items-center text-xl font-bold gap-3 rounded-md bg-indigo-500 text-white hover:brightness-95"
                            onClick={handleLogout}>
                            <Logout />
                            <p>
                                Log out
                            </p>
                        </button>
                    </div>
                )
            } */}
        </nav>
    );
}

export default Navbar;