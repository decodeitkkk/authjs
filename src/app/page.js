import Image from "next/image";
import Header from "@/app/components/Header";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className=" h-screen overflow-hidden bg-gray-600 bg-[url(/home4.jpg)] bg-cover z-0 ">
                <Header />
                <div className=" inset-0 "></div>

                <div className="container relative z-10 flex items-end  h-[100%] px-6 py-32 mx-auto md:px-12 xl:py-40">
                    <div className="relative z-10 flex flex-col items-start   lg:w-3/5 xl:w-2/5">
                        <span className="font-bold text-yellow-400 uppercase">
                            Authentication App
                        </span>
                        <h1 className="mt-4  text-4xl font-bold leading-tight text-white sm:text-7xl">
                            My Destiny Is
                            <br />
                            Mine
                            <br />
                            To Weave
                        </h1>
                        <Link
                            href="/register"
                            className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
