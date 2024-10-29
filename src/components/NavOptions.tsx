'use client'
import Link from "next/link";
import { useState } from "react";

interface Props {
    title: string,
    icon: any,
    path: string
}

const NavOptions = ({title, icon, path}: Props) => {
    const [hovering, setHovering] = useState(false);

    return (
        <Link href={path} className="p-[16px] rounded-md bg-indigo-500 cursor-pointer hover:scale-[1.1] transition-all relative active:scale-[1]" onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}>
            {icon}
            {
                hovering &&
                (
                    <div className="absolute left-[72px] top-0 flex items-center h-full mmx-[3px] px-[8px] text-white font-bold bg-black rounded-lg shadow-md">
                        <p>{title}</p>
                    </div>
                )
            }
        </Link>
    );
}

export default NavOptions;