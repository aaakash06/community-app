import { getTagById } from '@/database/actions.db'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/shared/SearchBar/SearchBar'
import FilterDropDown from '@/components/shared/Filter/Filter'
import { Button } from '@/components/ui/button'
import { HomeFilter } from '@/constants/constants'
import Cart from '@/components/shared/Cart/Cart'




const TagDetails = async ({params}: {params: {id:string}}) => {

const tag = await getTagById(params.id); 

  return (
 <>

        <h1 className="h1-bold text-dark100_light900 max-sm:text-[20px] mb-10">{tag.name}</h1>
      

      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">
        <SearchBar />
        <FilterDropDown items={HomeFilter}></FilterDropDown>
      </div>

      <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
        {tag.questions?.map(
          //@ts-ignore
          (q) => {
          return <Cart  key={q._id} 
        
          question={q}></Cart>
        })}
        </div>
 </>
  )
}

export default TagDetails