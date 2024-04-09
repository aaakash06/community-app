"use client"
import useTheme from '@/context/context';
import React from 'react'
import Image from 'next/image'
// ran into problem with localStorage.them
const ImageComponent = () => {

      const {mode} = useTheme()
      return(<Image className='mx-auto' alt='no-saved-question' src={mode=='dark'? "/assets/images/dark-illustration.png": "/assets/images/light-illustration.png"} height={300} width={350}></Image>)
      

}

export default ImageComponent