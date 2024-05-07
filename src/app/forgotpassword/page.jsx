"use client";

import axios from "axios";
import { ChevronLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const page = () => {
    const [email, setEmail] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    let handleChange = (e) => {
        setEmail(e.target.value);
        setButtonDisabled(false);
    };
    let onLogin = async () => {
        if (email.length <= 0) {
            toast.error(`Fill the email field.`);
            return;
        }

        try {
            setLoading(true);
            let response = await axios.post("/api/forgotpassword", {
                email: email,
            });
            console.log(response?.data);
            

            if (response?.data?.success === true) {
                toast.success(`Reset password email sent`);
            } else {
                toast.error(`Invalid email id for password reset `);
            }
        } catch (error) {
            // console.log(error?.response?.data?.error)
            toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Toaster />
            <div className="bg-[url(/home4.jpg)] h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 h-[15%]  ">
                <Link href="/" >
                <Image
                width={200}
                height={100}
                alt="logo"
                src="/Group 47603.png"
                />
                </Link>
                </div>
                <div className=" h-[75%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <Link href="/login">
                            <div className="text-sm my-4 flex justify-start flex-row items-center cursor-pointer ">
                                <span>
                                    <ChevronLeft />
                                </span>
                                Back to login
                            </div>
                        </Link>
                        <div className="  mb-5 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Forgot your password ?
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Don’t worry, happens to all of us. Enter your
                                email below to recover your password
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-5">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <Mail />
                                        </span>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <button
                                        type="button"
                                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onLogin}
                                    >
                                        {buttonDisabled
                                            ? "Fill Details"
                                            : loading
                                            ? "Processing..."
                                            : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                       
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <Image
                            width={1000}
                            height={100}
                            src="/Group 4.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt="login image"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
