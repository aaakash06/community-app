import React from 'react'

interface Prop{
item: string; 

}

const Tag = ({item}:Prop) => {
  return (
    <span className='border dark:bg-slate-800  border-none p-1 px-3 bg-light-800 text-[11px] rounded-sm  text-zinc-400 dark:text-sky-200'>{item}</span>
  )
}

export default Tag