"use client"
import React from 'react'
import { useFormState } from 'react-dom'

import { postQuestion } from '@/database/actions.db'
import { useRouter } from 'next/navigation'

function callFunc(currState, formData){
  const data =Object.fromEntries(formData)
//  router.push('/')
 return postQuestion(data); 
 
 }

const AskQuestion = () => {
let initialState={}; 
const router = useRouter(); 

function callFunct(currState,formData){
router.push('/')
  callFunc(currState,formData)
}



const [state, formAction] =useFormState<any,any>(callFunct, initialState); 




  return (

    <div >
      <form action={formAction} className='text-dark200_light900 flex flex-col'>
      <h1>       
      AskQuestion</h1>

    <span className='mandatory'>Question Title</span>
    <input className='w-1/2 bg-gray-50 ' name="title" placeholder='write your question title' type="text" />
    
<span className='mandatory'>Detailed explanation of your problem</span>
    <input className='w-1/2 bg-gray-50 ' name="description" placeholder='write your question description' type="text" />
    
    <span className='mandatory'>Tags</span>
    <input className='w-1/2 bg-gray-50 ' name="tags" placeholder='write your question title' type="text" />
    
<button className='bg-white text-black mt-20'> Ask a question</button>
</form>
    </div>
  
  )
}

export default AskQuestion