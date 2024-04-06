import React from 'react'
import Tag from '../shared/TagComponent/Tag'
import { ITag } from '@/database/model.db'

const TagCart = ({tag}:{tag: ITag}) => {
  return (
    <>
    <div className=" max-w-[15rem]  rounded-xl flex flex-col justify-between gap-5 text-dark200_light900 border-light-600 shadow-md   dark:bg-dark-200  max-sm:p-5 px-7 py-10 ">

    <Tag item={tag.name} rounded="sm" otherStyle="max-w-[11rem] w-[4rem]  line-clamp-1 text-[.9rem] "></Tag>


<span className='text-sm line-clamp-2'>{tag.description  } </span>
     
<div className='px-1  max-sm:px-0'> <span className='text-primary-500'>{tag.questions.length}+</span> <span className=' dark:text-sky-500  text-sm ml-2  max-sm:ml-0 '> Questions</span> </div>
    </div>
  </>
  )
}

export default TagCart