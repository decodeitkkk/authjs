"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import axios from "axios";

const page = () => {
    const [name, setName] = useState("");
    useEffect(() => {
        let fetchData = async () => {
            try {
                let res = await axios.post("/api/me", {});
                console.log(res);
                console.log(res?.data?.data?.username);
                setName(res?.data?.data?.username);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="h-screen  bg-[url(/home4.jpg)] ">
                <Header />
                <div className="h-full w-full flex items-center justify-center ">
                    <div className="flex justify-center items-center text-3xl font-bold border border-gray-400 backdrop-blur-sm bg-white/15  rounded-lg px-6 py-4  ">
                        Welcome Mr./Mrs. {name.toUpperCase()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
