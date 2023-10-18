import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs";
export default function Home() {
  return (
    <div className='flex flex-col justify-center sm:items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
      <h1 className='text-8xl sm:text-7xl font-bold'>say hello to the new era of</h1>
      <h1 className='text-8xl sm:text-7xl font-bold text-white'>social media</h1>
      <div className='mt-10'>
        {/* <Link href="/login" className='border rounded-full p-2'>Login</Link> */}
        <Link 
        href="/signup" 
        className='font-mono bg-gradient-to-r from-cyan-500 border-none px-3 py-3 rounded-full text-xl text-white font-bold'>
          letsss go
          <BsArrowRight className='inline-block ml-2' size={30} />
        </Link>
      </div>
    </div>
  )
}
