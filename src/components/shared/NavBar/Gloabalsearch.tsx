import React from 'react'
import Image from 'next/image'
const GlobalSearch = () => {
  return (
    <div className=" w-[460px] gap-3 rounded-lg max-lg:hidden flex items-center background-light800_dark300 py-4 shadow-light-200 dark:shadow-none "> 
<Image className='ml-2' alt='searchIcon' src="/assets/icons/search.svg" width={20} height={20}></Image>
    <input type="text" className='flex-1 text-sm placeholder:text-sm border-none outline-none  h-full bg-transparent' placeholder='Global Search' />
    </div>
  )
}

export default GlobalSearch