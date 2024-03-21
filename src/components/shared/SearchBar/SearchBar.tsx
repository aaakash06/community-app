import React from 'react'
import Image from 'next/image'
const SearchBar = () => {
  return (
    <div className=" w-full gap-3 rounded-lg flex items-center background-light800_dark300 py-4 shadow-sm dark:shadow-none "> 
    <Image className='ml-2' alt='searchIcon' src="/assets/icons/search.svg" width={20} height={20}/>
        <input type="text" className='flex-1 dark:placeholder:text-slate-700 text-sm placeholder:text-sm border-none outline-none  h-full bg-transparent text-dark100_light900' placeholder='Global Search' />
        </div>
  )
}

export default SearchBar