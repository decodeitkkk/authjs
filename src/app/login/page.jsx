"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Facebook, Github, Mail } from "lucide-react";

import Image from "next/image";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const handleChange = async (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const onLogin = async () => {
        try {
            setLoading(true);

            // console.log(`here in try`, user);
            const response = await axios.post("/api/login", user);
            console.log("response",response)
            toast.success(`Login successfull`);
            router.push("/profile");
        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    };
    const handleHide = () => {
        setHide((prev) => !prev);
    };
    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
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
                        <div className="  my-10 font-bold   ">
                            <div className="text-4xl dark:text-white">
                                Login
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Let’s get you all st up so you can access your
                                personal account.
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <Mail />
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
                                <div className="flex items-center mb-6 -mt-4">
                                    <div className="flex ml-auto">
                                        <Link
                                            href="/forgotpassword"
                                            type="button"
                                            className="inline-flex text-xs font-light text-red-700 sm:text-sm dark:text-white 
                                    dark:font-medium hover:text-gray-700 dark:hover:text-white"
                                        >
                                            Forgot Your Password?
                                        </Link>
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
                                            : "Login"}
                                    </button>
                                </div>
                                <div className=" mb-6 mt-2">
                                    <div className="flex ml-auto justify-center ">
                                        <Link
                                            href="/register"
                                            type="button"
                                            className="inline-flex text-xs font-light text-dark-700 sm:text-sm dark:text-white hover:text-gray-700 dark:hover:text-white"
                                        >
                                            Don’t have an account? &nbsp;
                                            <span className="text-red-700 dark:text-white dark:font-medium">
                                                Sign up
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <Image
                            height={100}
                            width={1000}
                            src="/Group 4.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt="homepage image"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
