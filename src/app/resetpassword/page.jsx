"use client";

import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const page = () => {
    const [DisplayPassword, setDisplayPassword] = useState(false);
    const [hide, setHide] = useState(true);
    const [error, setError] = useState(false);
    const [userPassword, setUserPassword] = useState({
        newPassword1: "",
        newPassword2: "",
    });
    let router = useRouter();

    let handlePasswordChange = (e) => {
        setUserPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    let onSubmit = async (e) => {
        e.preventDefault();
        if (
            userPassword.newPassword1.length == 0 ||
            userPassword.newPassword2.length == 0
        ) {
            toast.error(`Enter Password`);
            return;
        }
        if (userPassword.newPassword1 !== userPassword.newPassword2) {
            toast.error(`password not matched`);
            return;
        }
        let token = window.location.search.split("=")[1];

        console.log(userPassword.newPassword1, token);

        try {
            let response = await axios.post("/api/resetpassword", {
                password: userPassword.newPassword1,
                token,
            });
            console.log(response);
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                router.push("/login");
            } else {
                toast.error(response?.data?.message);
            }
            // console.log(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            console.log(error);
        }
    };

    let showPassword = (e) => {
        e.preventDefault();
        setHide((prev) => !prev);
    };

    useEffect(() => {
        let token = window.location.search.split("=")[1];

        let match = () => {
            if (userPassword.newPassword2 === userPassword.newPassword1) {
                setError(false);
            } else {
                setError(true);
            }
        };
        match();
    }, [userPassword.newPassword2]);

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
                                Set a password
                            </div>
                            <div className="font-light my-3 text-sm dark:text-white ">
                                Your previous password has been reseted. Please
                                set a new password for your account.
                            </div>
                        </div>
                        <div className="form">
                            <form action="#" autoComplete="off">
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="newPassword1"
                                            name="newPassword1"
                                            value={userPassword.newPassword1}
                                            onChange={handlePasswordChange}
                                            className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="New Password"
                                        />

                                        <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <button
                                                type="button"
                                                onClick={showPassword}
                                            >
                                                {hide ? <EyeOff /> : <Eye />}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <input
                                            type={hide ? "password" : "text"}
                                            id="newPassword2"
                                            name="newPassword2"
                                            value={userPassword.newPassword2}
                                            onChange={handlePasswordChange}
                                            className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder=" Confirm Password"
                                        />

                                        <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                            <button
                                                type="button"
                                                onClick={showPassword}
                                            >
                                                {hide ? <EyeOff /> : <Eye />}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-6 ">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                                    >
                                        <span
                                            className={` ml-2 font-semibold  ${
                                                error
                                                    ? "text-red-600"
                                                    : "text-white"
                                            } `}
                                        >
                                            {error
                                                ? "Password Not Matching"
                                                : ""}
                                        </span>
                                    </a>
                                </div>

                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className=" hidden sm:block sm:h-[100%]  sm:mx-auto ">
                        <Image
                            height={100}
                            width={1000}
                            src="/resetpassword.png"
                            className="object-contain  shadow-lg w-[100%] h-[100%] "
                            alt="reset passsword"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
