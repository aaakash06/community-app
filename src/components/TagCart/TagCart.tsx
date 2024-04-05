import React from 'react'
import Tag from '../shared/TagComponent/Tag'
import { ITag } from '@/database/model.db'

const TagCart = ({tag}:{tag: ITag}) => {
  return (
    <>
    <div className=" max-w-[15rem]  rounded-xl flex flex-col justify-between gap-5 text-dark200_light900 border-light-600 shadow-md   dark:bg-dark-200   p-7 ">

    <Tag item={tag.name} rounded="sm" otherStyle="max-w-[11rem] line-clamp-1 text-[.9rem] "></Tag>



     
<div className='px-1'> <span className='text-primary-500'>{tag.questions.length}+</span> <span className=' dark:text-sky-500  text-sm ml-2 '> Questions</span> </div>
    </div>
  </>
  )
}

export default TagCart