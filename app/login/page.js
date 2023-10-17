"use client";
import { useState } from "react";
import { account, ID } from "../appwrite";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import socialPic from "../../public/Online world-cuate.png";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = async (email, password) => {
        try {
            const session = await account.createEmailSession(email, password);
            router.push('/dashboard');
        } catch (error) {   
            console.log(error?.message);
        }
    };

    return (
        <div className="h-screen flex flex-row w-screen items-center justify-around">
            <form className="flex flex-col w-50 p-5 gap-4">
                <h1 className="text-3xl font-bold">welcome back to pixy!</h1>
                <input  
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b p-3 focus:outline-none"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b p-3 focus:outline-none"
                />
                <button className="p-2 w-50 bg-cyan-400 rounded-full" type="button" onClick={() => login(email, password)}>
                    Login
                </button>
            </form>
            <Image src={socialPic} width={500} height={600}/>
        </div>
    );
};

export default LoginPage;
