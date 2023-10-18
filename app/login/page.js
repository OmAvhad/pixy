"use client";
import { useState } from "react";
import { account, ID } from "../appwrite";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import socialPic from "../../public/Online world-cuate.png";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = async (email, password) => {
        try {
            const session = await account.createEmailSession(email, password);
            router.push('/dashboard');
        } catch (error) {
            alert(error);
            console.log(error?.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-cyan-200 to-pink-200 h-screen flex flex-col sm:flex-row w-screen items-center justify-around">
            <form className="flex flex-col w-50 p-5 gap-4">
                <h1 className="text-3xl font-bold">welcome back to pixy!</h1>
                <input  
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b p-3 focus:outline-none rounded-md"
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b p-3 focus:outline-none rounded-md"
                />
                <div className="flex flex-col">
                    <button className="p-2 w-50 bg-cyan-400 rounded-md" type="button" onClick={() => login(email, password)}>
                        Login
                    </button>
                    <h1 className="ml-36 text-sm">don't have an account? 
                        <Link href="/signup" className="underline">
                        register
                        </Link>
                    </h1>
                </div>
            </form>
            <Image className="hidden" src={socialPic} width={500} height={600} alt="image"/>
        </div>
    );
};

export default LoginPage;
