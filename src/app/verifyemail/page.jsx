"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NextResponse } from "next/server";
import toast, { Toaster } from "react-hot-toast";

const verifyemail = () => {
    const router = useRouter();
    const [verifyToken, setVerifyToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [st, setSt] = useState("");

    let verifyemailToken = async () => {
        try {
            console.log(verifyToken);
            let res = await axios.post(`/api/verifyemail`, {
                verifyToken: verifyToken,
            });
            setVerified(true);
            console.log(res);
            console.log(res?.data?.message);
            setSt(res?.data?.message);
        } catch (error) {
            console.log(error?.response?.data?.error);
            setError(true);
            setSt(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        let urlToken = window.location.search.split("=")[1];
        setVerifyToken(urlToken || "");

        const { query } = router;
        const urlToken2 = query?.token;
        console.log(urlToken);
        console.log(urlToken2);
    }, []);

    return (
        <>
            <Toaster />
            <div className="dark:bg-indigo-900 h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 h-[15%]  ">
                    <Link href="/">
                        <Image
                            height={100}
                            width={200}
                            alt="logo"
                            src="/Group 47603.png"
                        />
                    </Link>
                </div>
                <div className=" h-[75%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <div className="text-sm flex justify-start flex-row items-center cursor-pointer ">
                            <Link href="/login" className="cursor-pointer">
                                <ChevronLeft />
                            </Link>
                            Back to login
                        </div>
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Verify email
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                An authentication code has been sent to your
                                email.
                            </div>
                            <div>
                                <button
                                    onClick={verifyemailToken}
                                    className="bg-transparent hover:bg-blue-500 text-white font-semibold  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                >
                                    Click to verify email
                                </button>
                            </div>
                            <div className="font-light my-5  text-base dark:text-white ">
                                Email verification Status:{" "}
                                <span
                                    className={` font-medium ${
                                        error
                                            ? "dark:text-red-400   "
                                            : "text-green-600"
                                    } `}
                                >
                                    {" "}
                                    {st}{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <Image
                            height={100}
                            width={1000}
                            src="/emailverify.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt="verify email"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default verifyemail;
