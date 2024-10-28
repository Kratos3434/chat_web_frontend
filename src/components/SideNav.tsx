'use client'

import { Chat, Face } from "@mui/icons-material";
import NavOptions from "./NavOptions";

const SideNav = () => {

    return (
        <nav className="fixed top-0 left-0 h-[100dvh] bg-black p-[16px] py-[30px]">
            <div className="flex flex-col justify-between h-full">
                <NavOptions icon={<Chat />} title="Chat" />
                <div>
                    <NavOptions icon={<Face />} title="Profile" />
                </div>
            </div>
        </nav>
    )
}

export default SideNav;