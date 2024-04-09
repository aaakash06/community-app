"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";
import { handleVote, increaseViewCount, saveQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import { usePathname } from "next/navigation";

interface Prop {
  prop: {
    upvotes: number;
    downvotes: number;
    includesUpvotes: boolean; 
    includesDownvotes: boolean; 
    userId: string | null;
    qId: string;
    hasSaved?: boolean;
    answer? : boolean; 
  }

}

const Voting = (
  {
    prop,
  }: Prop
 ,
) => {

  const { upvotes, downvotes, userId, qId, hasSaved, includesDownvotes ,includesUpvotes, answer=false } = prop;

const pathName = usePathname(); 
  const router = useRouter();
useEffect(()=>{
  if(userId && !answer){
    increaseViewCount(userId,qId,'view'); 

  }

}  ,[userId,router,qId])

  return (
    <div className="flex gap-2 items-center ">
      {includesUpvotes ? (
        <button
          title="click"
          type="button"
          onClick={() => {
            if (!userId) router.push("/sign-up");
            else {
    handleVote(prop, "upvote");
            }
          }}
        >
          <Image
            src="/assets/icons/upvoted.svg"
               width={0}
          height={0}
            style={{ width: 'auto', height: 'auto' }}
            alt="upvote"
          ></Image>
        </button>
      ) : (
        <button
          title="click"
          onClick={() => {
            if (!userId) router.push("/sign-up");
            else {
                        handleVote(prop, "upvote");
            }
          }}
        >
          <Image
            src="/assets/icons/upvote.svg"
               width={0}
          height={0}
            style={{ width: 'auto', height: 'auto' }}
            alt="upvote"
          ></Image>
        </button>
      )}
      {upvotes}
      {includesDownvotes ? (
        <button
          title="click"
          type="button"
          onClick={() => {
            if (!userId) router.push("/sign-up");
            else {
          
              handleVote(prop, "downvote");
            }
          }}
        >
          <Image
            src="/assets/icons/downvoted.svg"
               width={0}
          height={0}
            style={{ width: 'auto', height: 'auto' }}
            alt="upvote"
          ></Image>
        </button>
      ) : (
        <button
          title="click"
          onClick={() => {
         
            if (!userId) router.push("/sign-up");
            else {
          
              handleVote(prop, "downvote");
            }
          }}
        >
          <Image
            src="/assets/icons/downvote.svg"
               width={0}
          height={0}
            style={{ width: 'auto', height: 'auto' }}
            alt="upvote"
          ></Image>
        </button>
      )}
      {downvotes}
{!answer &&  (hasSaved ? (
  <button
    title="click"
    onClick={() => {
      if (!userId) router.push("/sign-up");
      else {
        saveQuestion(qId,JSON.parse(userId), "unsave");
      }
    }}
  >
    <Image
      src="/assets/icons/star-filled.svg"
      width={20}
      height={20}
      alt="upvote"
    ></Image>
  </button>
) : (
  <button
    title="click"
    onClick={() => {
      if (!userId) router.push("/sign-up");
      else {
        saveQuestion(qId,JSON.parse(userId), "save");
      }
    }}
  >
    <Image
      src="/assets/icons/star-red.svg"
      width={20}
      height={20}
      alt="upvote"
    ></Image>
  </button>
)

) }
      
    </div>
  );
};

export default Voting;
