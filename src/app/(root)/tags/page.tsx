import TagCart from '@/components/TagCart/TagCart'
import FilterDropDown from '@/components/shared/Filter/Filter'
import SearchBar from '@/components/shared/SearchBar/SearchBar'
import { getAllTags } from '@/database/actions.db'
import React from 'react'
import { ITag } from '@/database/model.db'

const arr = [ 'one', 'two','three']
const filter = [
  'New Users',' Old Users', 'Top Contributors'
  ]
  

const Tags = async () => {
const allTags = await getAllTags() ; 


  return (
   <div>
 <div className="flex w-full  flex-col justify-between gap-5 sm:flex-row sm:items-center mb-10">
<h1 className="h1-bold text-dark100_light900"> All Tags</h1>  

      </div>

     
      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">

<SearchBar/>
<FilterDropDown items={filter} tags={false}></FilterDropDown>

</div>
   
<div className='mt-10 max-lg:w-[70%] max-md:w-[90%]  grid grid-cols-2 lg:grid-cols-3 gap-4 max-lg:gap-10'>
{
allTags?.map(tag=> <TagCart key={tag.name} tag={tag}></TagCart> )

}


</div>

   </div>
  )
}

export default Tags