import { getQuestionById, getUserById } from '@/database/actions.db';
import React from 'react'
import Image from 'next/image';
import { formatNumber, getTimeAgo } from '@/lib/utils';
import Tag from '@/components/shared/TagComponent/Tag';
import { HomeFilter } from "@/constants/constants";
import FilterDropDown from '@/components/shared/Filter/Filter';
import Link from 'next/link';
import ParseHTML from '@/components/ParseHTML';
import AnswerForm from '@/components/AnswerForm';
import { IQuestion } from '@/database/model.db';


// const answers = ({answer})=>{

// return(
// <>



// {



// }
// </>


// )

// }


const QuestionDetail = async ({params, searchParams}:{params: {id:string} ;  searchParams: any}) => {

const question= await getQuestionById(params.id); 
// console.log(question)
const {answers  } = question; 
// console.log(answers)
// console.log(question)
  return (

    <div className='flex flex-col gap-10 dark:text-white'>

<div className='flex justify-between'>
  <div className='flex gap-2'>
  <Link
            href={`/community`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={question.author.picture}
              alt="profile picture"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-sm text-dark300_light700">
              {question.author.name}
            </p>
          </Link>



  </div>



<div>
upvote downvote
</div>

</div>

<h2 className='h3-bold'> {question.title} </h2>

<div className='flex gap-5 max-sm:gap-3 text-sm max-sm:text-[12px]'>
<div className="like flex gap-1">
<Image  alt="avatar" className='rounded-full' src="/assets/icons/clock.svg" width={15} height={15}></Image> <span className="">   - asked {getTimeAgo(question.createdAt)}</span> 
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


<div className='bg-light-800 dark:bg-dark-200 rounded-sm sm:p-5 max-sm:py-3'>
<div className='mb-20  w-full'>  <ParseHTML content={question.content}></ParseHTML> </div>
<div className="tags flex gap-3 max-sm:mr-4">
{
  //@ts-ignore
question.tags.map(tag =>   <Tag key={tag.name} item={tag.name} rounded="sm" otherStyle="max-sm:px-[10px]   px-4 "/>  )

}

          
         
          </div>



</div>

<div className='flex justify-between items-center'>
<span className='text-primary-500'> {answers.length} answers</span>
<FilterDropDown items={HomeFilter}></FilterDropDown>
</div>
<div>
{

answers?.length ==0 ? (

<h3> No answer has been posted for this question. Be the first one!!</h3>
//@ts-ignore
):   answers.map(ans =><div key={ans} className='mb-4 py-3 px-2 bg-light-800 dark:bg-dark-200 rounded-sm  w-full'>  <ParseHTML content={ans}></ParseHTML> </div> )





}

</div>
<div>

<div className='flex justify-between mb-10'>

<span>Write your anwer here</span>

<span>Generate AI answer</span>
</div>

<AnswerForm qId={params.id}/>

</div>

    </div>
  )
}

export default QuestionDetail