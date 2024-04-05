import React from 'react'

interface Prop{
item: string; 
rounded?: string; 
otherStyle?: string; 
}

const Tag = ({item,rounded,otherStyle}:Prop) => {
  return (
    <span className={` ${otherStyle} cursor-pointer shadow-sm  rounded-${rounded} border dark:bg-dark-400  border-none p-1 px-5 bg-light-800 text-[11px] text-zinc-500  dark:text-sky-300 `}>{item}</span>
  )
}

export default Tag