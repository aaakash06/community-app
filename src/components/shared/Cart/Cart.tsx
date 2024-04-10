

import React from 'react'
import Tag from '../TagComponent/Tag'
import Image from 'next/image'
import { getTimeAgo,formatNumber } from '@/lib/utils'
import { IQuestion, ITag } from '@/database/model.db'
import { deleteItem, getUserById } from '@/database/actions.db'
import mongoose from 'mongoose'
import Link from 'next/link'
import { SignIn, SignedIn, auth } from '@clerk/nextjs'
import EditQuestionAnswer from '@/components/EditQuestionAnswer'


type QuestionType = {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  tags: ITag[];
  views: number;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  author: mongoose.Schema.Types.ObjectId;
  answers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
};

interface Prop {
question : QuestionType; 
edit?: boolean; 

}

const Cart = async ({ question,edit=false }: Prop) => {
const {userId} = auth(); 
  const author: any = await getUserById(question.author!);
  const authName: string = author?.name || "aakash";

const editCondition = edit && userId == author.clerkId; 


  return (


  
    <div className="flex flex-col gap-5 p-7 max-sm:px-4  background-light900_dark200 rounded-lg shadow-md  ">
     <div className="flex items-center gap-1 md:hidden ">
            <Image  alt="avatar" className='rounded-full' src={author.picture} width={25} height={20}></Image>
            <span>{authName}<span className=""> - asked {getTimeAgo(question.createdAt)}</span> </span>
  
            </div>
         
         <div className='flex justify-between'>
         <h2 className="text-lg tracking-tighter max-sm:text-[18x] line-clamp-1 h3-semi-bold">    <Link className='hover:text-primary-500' href={`/questions/${question._id}`}> {question.title} </Link>  </h2>
         <SignedIn>
{
editCondition && <EditQuestionAnswer id={JSON.stringify(question._id)}></EditQuestionAnswer>

}


</SignedIn>


         </div>
        
     


          <div className="tags flex gap-3 max-sm:mr-4">
{
question.tags.map(tag =>   <Tag key={tag.name} item={tag} rounded="sm" otherStyle="max-sm:px-[10px]   min-w-[4rem] px-1 py-[.05rem] max-sm:text-[10px]"/>  )

}

          
         
          </div>
  
          <div className="bottom flex justify-between flex-wrap gap-y-5">
            <div className="flex items-center gap-1 max-md:hidden ">
            <Image  alt="avatar" className='rounded-full' src={author.picture} width={25} height={20}></Image>
            <span className=''> {authName} <span className="">- asked {getTimeAgo(question.createdAt)}</span> </span>
  
            </div>
       
  
            <div className="stats flex gap-2 items-center max-sm:gap-[15px]">
              <div className="like flex gap-1">
                <Image
                  src="/assets/icons/like.svg"
                  width={15}
                  height={15}
                  alt="like-svg"
                />
                <span> {formatNumber(question.upvotes.length)}  votes</span>
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