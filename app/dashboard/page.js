"use client";
import React, { useEffect, useState } from 'react'
import { account, ID } from "../appwrite";
import { useRouter } from 'next/navigation'

function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
        router.push('/login');
    };
    useEffect(() => {
        const checkLoggedIn = async () => {
          try {
            const session = await account.get();
            setUser(session);
            console.log('User is logged in:', session);
          } catch (error) {
            console.log('User is not logged in');
          }
        };
        // Call the function to check if the user is logged in
        checkLoggedIn();
    }, []);

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='flex flex-col font-bold'>
                Hey! Welcome {user?.name} 😃
                <input 
                type="text"
                placeholder='whats on your mind?'
                className='focus:outline-none'
                />
            </h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard
