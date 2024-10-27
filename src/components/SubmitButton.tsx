'use client'
import { CircularProgress } from "@mui/material";

interface Props {
    loading: boolean,
    title: string
}

const SubmitButton = ({ loading, title }: Props) => {
    return (
        <button 
            className={`w-full rounded-md bg-indigo-500 hover:brightness-95 py-[8px] text-xl text-white font-bold flex items-center justify-center gap-5 ${loading && "cursor-not-allowed"}`} 
            disabled={loading}>
            <p>{title}</p>
            {loading && <CircularProgress size={30} color="inherit" />}
        </button>
    );
}

export default SubmitButton;