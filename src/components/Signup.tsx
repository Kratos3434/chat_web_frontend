'use client'

import { signin, signup } from "@/controller/user";
import Link from "next/link";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

const Signup = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, isLoading] = useState(false);
    const user = useState({
        email: "",
        username: "",
        password: "",
        password2: ""
    })[0];

    const handleSignin = async (e: any) => {
        e.preventDefault();
        setError("");
        isLoading(true);
        try {
            await signup(user);
            router.replace("/verify");
        } catch (err: any) {
            setError(err);
            isLoading(false);
        }
    }

    return (
        <div className="w-full h-[100dvh] bg-indigo-500 flex laptop:flex-row flex-col laptop:justify-center items-center gap-5 p-[8px]">
            <div className="max-w-[400px] w-full flex flex-col gap-5 laptop:border-r-[1px] border-black">
                <div className="text-white font-bold text-8xl laptop:block flex gap-5 flex-wrap">
                    <p className="text-red-500">Pi</p>
                    <p>Chat</p>
                </div>
                <p className="text-white text-4xl">Let&apos;s chat</p>
            </div>
            <form className="flex flex-col max-w-[400px] w-full rounded-xl bg-white shadow-xl px-[8px] py-[16px] gap-5"
                onSubmit={handleSignin}>
                <h1 className="font-bold text-4xl">Sign up</h1>
                <div className="flex flex-col">
                    <label className="text-xl">Email</label>
                    <input type="email" className="w-full rounded-md outline-none py-[8px] px-[16px] border-[1px] border-gray-400"
                        onChange={(e) => user.email = e.target.value} />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl">Username</label>
                    <input type="text" className="w-full rounded-md outline-none py-[8px] px-[16px] border-[1px] border-gray-400"
                        onChange={(e) => user.username = e.target.value} />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl">Password</label>
                    <PasswordInput onChange={(e: any) => user.password = e.target.value} />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl">Confirm Password</label>
                    <PasswordInput onChange={(e: any) => user.password2 = e.target.value} />
                </div>
                <div>
                    <p className="py-[8px]">
                        Already have an account? <Link href="/signin" className="text-indigo-500 hover:underline">sign in</Link>
                    </p>
                    {
                        error &&
                        (
                            <div className="flex justify-center items-center">
                                <small className="text-red-500 font-bold">*{error}</small>
                            </div>
                        )
                    }
                    <SubmitButton loading={loading} title="Sign up" />
                </div>
            </form>
        </div>
    )
}

export default Signup;