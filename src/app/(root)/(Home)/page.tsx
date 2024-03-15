"use client"
import React from 'react'
import { UserButton } from "@clerk/nextjs";
import useTheme from '@/context/context';


const Home = () => {


  return (
    <div className='flex-between'>
<h1 className='text-primary-500 h1-bold spaceGrotesk'>home</h1>

<UserButton></UserButton>
    </div>
  )
}

export default Home