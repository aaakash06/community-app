import React from 'react'
import Link from 'next/link';
import { ITag } from '@/database/model.db';
interface Prop{
item: ITag; 
rounded?: string; 
otherStyle?: string; 

}

const Tag = ({item,rounded,otherStyle}:Prop) => {
  return (
    <span className={` ${otherStyle}  shadow-sm  rounded-${rounded} dark:bg-dark-400  dark:border-none p-1 px-1 bg-light-700 text-[11px] text-zinc-500  dark:text-sky-300 text-center `}> <Link href={`/tags/${item.id}`} className={``}> {item.name}</Link></span>
  )
}

export default Tag