"use client";
import React from "react";
import Image from "next/image";
import { deleteItem } from "@/database/actions.db";
import Link from "next/link";

const EditQuestionAnswer = ({
  id,
  // type = "question",
  type
}: {
  id: string;
  type: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
        {type == "question" &&  <Link href={`/questions/edit/${JSON.parse(id)}`}>
      <Image
        className="cursor-pointer"
        src="/assets/icons/edit.svg"
        width={14}
        height={14}
        alt="delete-icon"
      ></Image></Link>
  }


        <Image
          className="cursor-pointer"
          src="/assets/icons/trash.svg"
          width={14}
          height={14}
          alt="delete-icon"
          onClick={() => {
            deleteItem(id, type);
          }}
        ></Image>
    
    </div>
  );
};

export default EditQuestionAnswer;
