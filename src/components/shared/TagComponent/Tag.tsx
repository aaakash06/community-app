import React from 'react'

interface Prop{
item: string; 
rounded?: string; 
otherStyle?: string; 
}

const Tag = ({item,rounded,otherStyle}:Prop) => {
  return (
    <span className={` ${otherStyle} cursor-pointer shadow-sm  rounded-${rounded} dark:bg-dark-400  dark:border-none p-1 px-1 bg-light-700 text-[11px] text-zinc-500  dark:text-sky-300 text-center `}>{item}</span>
  )
}

export default Tag