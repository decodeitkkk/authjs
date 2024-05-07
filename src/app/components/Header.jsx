"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Header = () => {
    const [logout, setLogout] = useState(false);
    const pathname = usePathname();
    console.log(pathname);
    let router = useRouter();
    let logoutFn = async () => {
        try {
            let res = await axios.post("/api/logout", {});
            console.log(res?.data);
            toast.success(res?.data?.message);
            router.push("/login");
        } catch (error) {
            console.log(error?.response?.data?.error);
            toast.success(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        if (pathname === "/profile") {
            setLogout(true);
        }
    }, []);

    return (
        <>
            <Toaster />
            <header className="bg-transparent z-50  ">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link href="/">
                                <Image
                                    height={100}
                                    width={200}
                                    alt="logo"
                                    src="/Group 47603.png"
                                />
                            </Link>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <div className="flex items-center ">
                                <div className="flex gap-4">
                                    {logout ? (
                                        <div className=" flex">
                                            <button
                                                className="rounded-md bg-red-100 px-5 py-2.5 text-sm font-medium text-red-600"
                                                onClick={logoutFn}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
                                                href="/login"
                                            >
                                                Login
                                            </Link>

                                            <div className=" flex">
                                                <Link
                                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer"
                                                    href="/register"
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="hidden">
                                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
