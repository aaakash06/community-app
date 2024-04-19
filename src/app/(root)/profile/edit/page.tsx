import React from 'react'
import EditProfile from '@/components/EditProfile'
import { auth } from '@clerk/nextjs'
import { getUserByClerkId } from '@/database/actions.db';

const ProfileEdit = async () => {
  const {userId} = auth(); 
const user = await getUserByClerkId(userId!); 

  return (
    <div>
    <h1 className="h1-bold mb-10 text-dark-100 dark:text-light-900">
    Edit Your Profile
      </h1>
     
<EditProfile userDetails={JSON.stringify(user)} ></EditProfile>

     
    </div>
  )
}

export default ProfileEdit
