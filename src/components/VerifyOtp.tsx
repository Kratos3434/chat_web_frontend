'use client'

import { useState } from "react";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";
import { Mail } from "@mui/icons-material";
import { resendOtp, verify } from "@/controller/user";
import { useRouter } from "next/navigation";

interface Props {
    email: string,
    token?: string
}

const VerifyOtp = ({ email, token }: Props) => {
    const router = useRouter();
    const [loading, isLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendError, setResendError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");

    const handleResendOtp = async () => {
        setResendLoading(true);
        setOpenModal(true);
        try {
            await resendOtp(token);
        } catch (err: any) {
            setResendError(err);
        }
        setResendLoading(false);
    }

    const handleVerifyOtp = async (e: any) => {
        e.preventDefault();
        setError("");
        isLoading(true);
        try {
            await verify(otp, token);
            //Clear verify token
            await fetch("/internal_api/otp", {
                method: 'DELETE'
            });

            router.replace("/signin");
        } catch (err: any) {
            setError(err);
            isLoading(false);
        }
    }

    return (
        <div className="w-full h-[100dvh] bg-indigo-500 flex laptop:flex-row flex-col laptop:justify-center items-center gap-5 p-[8px]">
            <div className="max-w-[500px] w-full rounded-md shadow-xl py-[16px] px-[8px] bg-white flex flex-col gap-5">
                <h1 className="text-4xl font-bold">Verify Email</h1>
                <p>An email has been sent to <b>{email}</b></p>
                <div>
                    <form className="flex gap-1 items-center" onSubmit={handleVerifyOtp}>
                        <input type="text" placeholder="XXXXXX" maxLength={6}
                            className="border-[1px] border-gray-400 p-[16px] w-full rounded-md font-bold" 
                            onChange={(e) => setOtp(e.target.value)} />
                        <button className={`text-white font-bold rounded-md bg-indigo-500 py-[16px] px-[16px] hover:brightness-95 ${loading && "cursor-not-allowed"}`} disabled={loading}>
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </form>
                    {error && <small className="font-bold text-red-500">*{error}</small>}
                </div>
                <p>
                    Didn&apos;t receive? <b className="cursor-pointer hover:underline text-indigo-500" onClick={handleResendOtp}>resend</b>
                </p>
            </div>
            {
                openModal &&
                (
                    <Modal>
                        <div className="max-w-[500px] w-full rounded-md shadow-xl py-[16px] px-[8px] bg-white flex flex-col gap-5">
                            {
                                resendLoading ?
                                    (
                                        <div className="flex justify-center items-center">
                                            <CircularProgress />
                                        </div>
                                    ) :
                                    (
                                        resendError ?
                                            (
                                                <div className="flex flex-col gap-5">
                                                    <p className="text-4xl font-bold">Resend Error</p>
                                                    <p>Error: <b className="text-red-500">{resendError}</b></p>
                                                </div>
                                            ) :
                                            (
                                                <div className="flex flex-col gap-5 text-center">
                                                    <p className="text-4xl font-bold">Resend</p>
                                                    <p className="text-lg">An email has been sent to <b>{email}</b></p>
                                                    <p>Please check your inbox <Mail className="text-indigo-500" /></p>
                                                </div>
                                            )
                                    )
                            }
                            {
                                !resendLoading &&
                                (
                                    <div className="flex justify-center items-center">
                                        <button className="px-[30px] py-[8px] bg-indigo-500 hover:brightness-95 rounded-md font-bold text-white"
                                            onClick={() => setOpenModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </Modal>
                )
            }
        </div>
    );
}

export default VerifyOtp;