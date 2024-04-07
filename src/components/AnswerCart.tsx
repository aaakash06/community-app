import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IAnswer } from '@/database/model.db'
import { getTimeAgo } from '@/lib/utils'
import ParseHTML from './ParseHTML'
import { getUserById } from '@/database/actions.db'



const AnswerCart = async ({ans}: {ans: IAnswer}) => {
  return (<>
    <div className='flex justify-between'>  <Link
    href={`/community`}
    className="flex items-center justify-start gap-2"
    >
    <Image
      src={await getUserById(ans.author).then(res => res.picture)}
      alt="profile picture"
      className="rounded-full"
      width={22}
      height={22}
    />
    <p className="text-sm text-dark300_light700">
    {await getUserById(ans.author).then(res => res.name)} <span>  - answered {getTimeAgo(ans.createdAt)} </span>
    </p>
    </Link>
    <div>Vote</div>
     </div>  <div className='mb-4 py-3 px-2 bg-light-800 dark:bg-dark-200 rounded-sm  w-full'><ParseHTML content={ans.content} ></ParseHTML> </div> 
  </>
   
  )
}

export default AnswerCart