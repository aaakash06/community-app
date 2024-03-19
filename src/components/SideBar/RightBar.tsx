import Link from 'next/link'
import React from 'react'

const hotQuestions = [
  { _id: 1, title: 'How do I use express as a custom server in NextJS?' },
  { _id: 2, title: 'Cascading Deletes in SQLAlchemy?' },
  { _id: 3, title: 'How to Perfectly Center a Div with Tailwind CSS?' },
  {
    _id: 4,
    title:
      'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?'
  },
  { _id: 5, title: 'Redux Toolkit Not Updating State as Expected' }
];

const popularTags = [
  { _id: 1, name: 'javascript', totalQuestions: 5 },
  { _id: 2, name: 'react', totalQuestions: 5 },
  { _id: 3, name: 'next', totalQuestions: 5 },
  { _id: 4, name: 'vue', totalQuestions: 2 },
  { _id: 5, name: 'redux', totalQuestions: 10 }
];

const RightBar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden gap-12">
<div className="topQ flex flex-col gap-6 ">

<h2 className='font-bold text-lg dark:text-light-900'>Top Question</h2>
<div className="links flex flex-col gap-7 text-[13px] text-dark-500 dark:text-sky-100">
{
hotQuestions.map((item)=>{

  return( <Link className='flex justify-between' key={item._id} href="#">
    
  <span> {item.title}</span>
  <span>{`>`} </span>
    </Link> )
})

}
</div>



</div>
<div className="popularTags flex flex-col gap-6 ">

<h2 className='font-bold text-lg dark:text-light-900'>Popular Tags</h2>
<div className="links flex flex-col gap-9 text-[13px]  text-dark-500 dark:text-light-700 ">

  {

popularTags.map(item=>{

return(
<Link key={item._id} className='flex justify-between'  href="#">
  <span className='border dark:bg-slate-800  p-1 px-3 bg-light-800  dark:text-sky-200 border-none text-[11px] rounded-sm  text-zinc-400'>{item.name}</span>
<span className='text-[11px]'>{item.totalQuestions}</span>

   </Link>

)

})

  }
  {

popularTags.map(item=>{

return(
<Link key={item._id} className='flex justify-between'  href="#">
  <span className='border dark:bg-slate-800  border-none p-1 px-3 bg-light-800 text-[11px] rounded-sm  text-zinc-400 dark:text-sky-200'>{item.name}</span>
  <span className='text-[11px]'>{item.totalQuestions}</span>
   </Link>

)

})

  }
  {

popularTags.map(item=>{

return(
<Link key={item._id} className='flex justify-between'  href="#">
  <span className='border dark:text-sky-200 dark:bg-slate-800  border-none p-1 px-3 bg-light-800 text-[11px] rounded-sm  text-zinc-400'>{item.name}</span>
  <span className='text-[11px]'>{item.totalQuestions}</span>
   </Link>

)

})

  }


</div>
  
</div>
  </section>
  )
}

export default RightBar