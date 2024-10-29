'use client'

import { Chat, Face, PersonAdd } from "@mui/icons-material";
import NavOptions from "./NavOptions";

const SideNav = () => {

    return (
        <nav className="fixed top-0 left-0 h-[100dvh] bg-black p-[16px] py-[30px]">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-5">
                    <NavOptions icon={<Chat />} title="Chat" path="/home" />
                    <NavOptions icon={<PersonAdd />} title="Add Friend" path="/home/add-friend" />
                </div>
                <div>
                    <NavOptions icon={<Face />} title="Profile" path="/home" />
                </div>
            </div>
        </nav>
    )
}

export default SideNav;