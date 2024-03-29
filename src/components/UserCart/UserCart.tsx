import React from 'react'
import Tag from '../shared/TagComponent/Tag'
import Image from 'next/image'

const user = {

name: "aakash ",
username:"aaakash_06",
tags: ['one','two','three']

}

const UserCart = () => {
  return (
    <>
    <div className=' max-w-[15rem] rounded-lg h-[17rem] flex flex-col justify-between text-dark200_light900 border-light-600 shadow-md  items-center dark:bg-dark-200 text-center  p-5'>

<Image className='invert dark:invert-0 ' alt='userImage' src="/assets/icons/user.svg" width={30} height={30}></Image>

<div className="desc">
<h3 className='uppercase h2-semibold text-[16px] '>{user.name}</h3>

<span>{`@${user.username}`}</span>

</div>

<div className='flex flex-col gap-2 items-center'>
{ user.tags.map(tag=> <Tag key={tag} item={tag} rounded='sm' otherStyle='w-20 '></Tag>  )   }



</div>



    </div>
    
    </>
  )
}

export default UserCart