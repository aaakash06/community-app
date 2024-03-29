import React from 'react'
import Tag from '../TagComponent/Tag'
import Image from 'next/image'
import { getTimeAgo,formatNumber } from '@/lib/utils'

interface QuestionType{


  _id: string; 
  title: string; 
  tags: {_id: string; name: string; }[],
  author: {
    _id: string;
    name: string; 
    picture:  string; 
  },
  upvotes: number; 
  views: number; 
  answers: string[]; 
  createdAt: Date; 
 

}

// type QuestionTypePartial = Partial<QuestionType>; 

 const Cart = ({question}:{question: QuestionType}) => {
  return (


  
    <div className="flex flex-col gap-5 p-7 background-light900_dark200 rounded-lg shadow-md ">
      <span className="sm:hidden">
        20 march 
        {/* {getTimeAgo(question.createdAt)} */}
      </span>
          <h2 className="text-lg tracking-tighter line-clamp-1 h3-semi-bold"> {question.title} </h2>
          <div className="tags flex gap-3">
            <Tag item="Mongoose" rounded="sm" otherStyle="px-2"/>
            <Tag item="Mongoose" rounded="sm "  otherStyle="px-2"/>
            <Tag item="Mongoose" rounded="sm "  otherStyle="px-2"/>
          </div>
  
          <div className="bottom flex justify-between">
            <div className="flex items-center gap-1">
            <Image className="invert dark:invert-0" alt="avatar" src="/assets/icons/avatar.svg" width={20} height={20}></Image>
            <span> Hello  <span className="max-sm:hidden">- asked {getTimeAgo(question.createdAt)}</span> </span>
  
            </div>
       
  
            <div className="stats flex gap-2 ">
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/like.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span>{formatNumber(question.upvotes)} votes</span>
              </div>
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/message.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span>{formatNumber(question.answers.length)} Answers</span>
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