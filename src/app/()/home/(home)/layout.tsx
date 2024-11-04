import Friends from "@/components/Friends";
import { cookies } from "next/headers";
import React from "react";

interface Props {
    children: React.ReactNode
}

const MainHomeLayout = async ({children}: Props) => {
    const token = (await cookies()).get('token')?.value;

    return (
        <div className="w-full h-[100dvh] flex p-[8px] gap-[8px]">
            <Friends token={token} />
            {children}
        </div>
    );
}

export default MainHomeLayout;