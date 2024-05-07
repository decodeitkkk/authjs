"use client";

import axios from "axios";
import { Eye, EyeOff, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [hide, setHide] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    let handleHide = () => {
        setHide((prev) => !prev);
    };

    let handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    let onSignup = async (e) => {
        if (buttonDisabled) {
            toast.error("Fill the form");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/register", user);
            // console.log(response.data.message)
            toast.success(response.data.message);

            router.push("/login");
        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        }
    }, [user]);
    return (
        <>
            <Toaster />

            <div className="bg-[url(/home4.jpg)] h-[100vh] w-min-[350px] w-max-[639px] sm:w-[100vw] box-border ">
                <div className=" py-2 px-4 sm:py-4 sm:px-20 h-[15%] flex justify-end ">
                    <Link href="/">
                        <Image
                            alt="logo"
                            width={200}
                            height={100}
                            src="/Group 47603.png"
                            className=" h-[50%] sm:h-[80%]"
                        />
                    </Link>
                </div>
                <div className=" h-[73%] w-[100%] sm:w-[100%] flex items-center sm:justify-start   ">
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <Image
                            height={100}
                            width={1000}
                            src="/singup_img.png"
                            className="object-contain  shadow-lg  h-[100%] "
                            alt="signup image"
                        />
                    </div>
                    <div className="  mx-auto w-[80%] sm:w-[35%] sm:mx-28  box-border ">
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Signup
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Let’s get you all set up so you can access your
                                personal account.
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <UserRound />
                                        </span>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your username"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <Mail />
                                        </span>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <span
                                            className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
                                            onClick={handleHide}
                                        >
                                            {hide ? <EyeOff /> : <Eye />}
                                        </span>
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="Your password"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <button
                                        type="button"
                                        className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onSignup}
                                    >
                                        {buttonDisabled
                                            ? "No Signup "
                                            : loading
                                            ? "Processing..."
                                            : "Signup"}
                                    </button>
                                </div>
                                <div className=" mb-6 mt-2">
                                    <div className="flex ml-auto justify-center ">
                                        <Link
                                            href="/login"
                                            type="button"
                                            className="inline-flex text-xs font-light text-dark-700 sm:text-sm dark:text-white hover:text-gray-700 dark:hover:text-white"
                                        >
                                            Already have an account? &nbsp;
                                            <span className="text-red-700 dark:text-white dark:font-medium">
                                                Login
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
