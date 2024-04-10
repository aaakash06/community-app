"use client";
import React from "react";
import Image from "next/image";
import { deleteItem } from "@/database/actions.db";

const EditQuestionAnswer = ({
  id,
  type = "question",
}: {
  id: string;
  type?: string;
}) => {
  return (
    <div className="flex gap-2">
      <Image
        className="cursor-pointer"
        src="/assets/icons/edit.svg"
        width={14}
        height={14}
        alt="delete-icon"
      ></Image>

      {type == "question" && (
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
      )}
    </div>
  );
};

export default EditQuestionAnswer;
