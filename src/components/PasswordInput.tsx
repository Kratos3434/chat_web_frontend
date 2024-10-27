'use client'

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"

interface Props {
    onChange?: any
}

const PasswordInput = ({ onChange }: Props) => {
    const [revealPass, setRevealPass] = useState(false);

    return (
        <div className="w-full rounded-md outline-none py-[8px] px-[16px] border-[1px] border-gray-400 flex items-center gap-1">
            <input type={ revealPass ? "text" : "password" }
                className="w-full outline-none"
                onChange={onChange} />
            <div className="cursor-pointer" onClick={() => setRevealPass(!revealPass)}>
                {revealPass ? <VisibilityOff /> : <Visibility />}
            </div>
        </div>
    )
}

export default PasswordInput;