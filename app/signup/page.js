"use client";
import { useState } from "react";
import { account, ID } from "../appwrite";
import { useRouter } from 'next/navigation'
import Link from "next/link";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const register = async () => {
        try {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
        } catch (error) {
            alert(error.message)
            console.log(error?.message);
        }
    };

    const login = async (email, password) => {
        try {
            const session = await account.createEmailSession(email, password);
            router.push('/dashboard');
        } catch (error) {   
            console.log(error?.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-cyan-200 to-pink-200 h-screen flex flex-row w-screen items-center justify-around">
            <form className="flex flex-col w-50 p-5 gap-4">
                <h1 className="text-3xl font-bold">lets get you onboard 😃</h1>
                <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b p-3 focus:outline-none rounded-md"
                />
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
                    <button className="p-2 w-50 bg-cyan-400 rounded-md" type="button" onClick={register}>
                    Register
                    </button>
                    <h1 className="ml-36 text-sm">already have an account? 
                        <Link href="/login" className="underline">
                        login
                        </Link>
                    </h1>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
