"use client";
import React, { useEffect, useState } from 'react'
import { account, databases, ID, query } from "../appwrite";
import { useRouter } from 'next/navigation'
import { Query } from "appwrite";
import { BsSend } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [postErrorMessage, setPostErrorMessage] = useState('');
    const router = useRouter();

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
        router.push('/login');
    };

    const post = async () => {
      if (content === '') {
        return;
      }
      try {
        await databases.createDocument(
          '652f9cd6b28b0bed9084',
          '652f9cee591dc18a865d',
          ID.unique(),
          {
            "content": content,
            "author": user.$id,
            "name": user.name
          });
          setContent('');
          getPosts();
      } catch (error) {
        if (error.code === 500) {
          alert('Internal server error. Please try again later.')
        }
        console.log(error);
      }
    };

    const getPosts = async () => {
      try{
        const posts = await databases.listDocuments(
          '652f9cd6b28b0bed9084',
          '652f9cee591dc18a865d',
          [
            Query.orderDesc('$createdAt')
          ]
          );
        setPosts(posts.documents)
        console.log(posts);
      } catch (error){
        if (error.code === 500) {
          setPostErrorMessage('Internal server error. Please try again later.')
          // alert('Internal server error. Please try again later.')
        }
        console.log(error);
      }
    };

    const like = async (documentId) => {
      const databaseId = '652f9cd6b28b0bed9084';
      const collectionId = '652f9cee591dc18a865d';
      try {
        const document = await databases.getDocument(databaseId, collectionId, documentId)
        if (document.likes) {
          document.likes.push(user.$id);
        }
        console.log(document)
        const updatedDocument = await databases.updateDocument(databaseId, collectionId, documentId, {"likes":document.likes});
        console.log(updatedDocument);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        const checkLoggedIn = async () => {
          try {
            const session = await account.get();
            setUser(session);
            console.log('User is logged in:', session.$id);
          } catch (error) {
            console.log('User is not logged in');
            router.push('/login');
          }
        };

        // Call the function to check if the user is logged in
        checkLoggedIn();
        getPosts();
    }, []);

    return (
        <div className='h-screen flex flex-col justify-start items-center w-screen p-2 text-xl'>
          <div className='w-full flex flex-row justify-between'>
            <h1 className='flex flex-col font-bold'>
                Hey! {user?.name} 😃
            </h1>
              <button className='font-bold' onClick={logout}>Logout</button>
          </div>
          <div className='flex flex-col justify-center w-96'>
            <div className='mt-4 gap-4 flex flex-row items-center'>
                <input 
                type="text"
                placeholder='whats on your mind?'
                className='focus:outline-none border-b p-2'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
                <BsSend  className='bg-gradient-to-r from-cyan-200 to-pink-200 rounded-md p-2 cursor-pointer' onClick={post} size={35}/>
                {/* <button>Post</button> */}
            </div>
            <div className='flex flex-col gap-2 mt-5'>
              { postErrorMessage !== "" && <h1 className='text-red-500'>No posts yet</h1> 
              }
              {posts.map((post) => (
                <div className='display-block rounded-md shadow-white' key={post.$id}>
                  <h2 className='text-sm'>{post.name}</h2>
                  <h1 className='overflow-hidden'>{post.content}</h1>
                  <AiOutlineHeart 
                  className='cursor-pointer'
                  size={20} 
                  onClick={() => like(post.$id)}/>
                  <span className='text-sm'>{post.likes?.length} Likes</span> 
                </div>
              ))}
            </div>
          </div>
        </div>
    )
}

export default Dashboard
