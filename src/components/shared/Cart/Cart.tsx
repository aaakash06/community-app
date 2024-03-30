import React from 'react'
import Tag from '../TagComponent/Tag'
import Image from 'next/image'
import { getTimeAgo,formatNumber } from '@/lib/utils'
import { IQuestion } from '@/database/model.db'


// type QuestionTypePartial = Partial<QuestionType>; 

 const Cart = ({question}:{question: IQuestion}) => {
  return (


  
    <div className="flex flex-col gap-5 p-7 background-light900_dark200 rounded-lg shadow-md ">
     <div className="flex items-center gap-1 md:hidden ">
            <Image className="invert dark:invert-0" alt="avatar" src="/assets/icons/avatar.svg" width={20} height={20}></Image>
            <span> question.author.name <span className="">- asked {getTimeAgo(question.createdAt)}</span> </span>
  
            </div>
          <h2 className="text-lg tracking-tighter line-clamp-1 h3-semi-bold"> {question.title} </h2>
          <div className="tags flex gap-3 max-sm:mr-4">
            <Tag item="Mongoose" rounded="sm" otherStyle="max-sm:px-[10px]  px-2 max-sm:text-[10px]"/>
            <Tag item="Mongoose" rounded="sm "  otherStyle="max-sm:px-[10px] px-2 max-sm:text-[10px]"/>
            <Tag item="Mongoose" rounded="sm "  otherStyle="max-sm:px-[10px] px-2 max-sm:text-[10px]"/>
          </div>
  
          <div className="bottom flex justify-between">
            <div className="flex items-center gap-1 max-md:hidden ">
            <Image className="invert dark:invert-0" alt="avatar" src="/assets/icons/avatar.svg" width={20} height={20}></Image>
            <span> Hello  <span className="">- asked {getTimeAgo(question.createdAt)}</span> </span>
  
            </div>
       
  
            <div className="stats flex gap-2 max-sm:gap-[15px]">
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/like.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span>{formatNumber(question.upvotes.length)} votes</span>
              </div>
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/message.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span >{formatNumber(question.answers.length)} Answers</span>
              </div>
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/eye.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span> { formatNumber(question.views)} views</span>
              </div>
            
            </div>
          </div>
        </div>
  
  
  )
  
  
  }


export default Cart