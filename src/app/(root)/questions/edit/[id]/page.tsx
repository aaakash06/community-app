import React from "react";
import { useFormState } from "react-dom";

import { getQuestionById, getUserByClerkId, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import QuestionsForm from "@/components/QuestionsForm";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/database/model.db";

const EditQuestion = async ({params}: {params: {id: string}}) => {
  const { userId } = auth();

  const dbUser = userId ? await getUserByClerkId(userId!) : null;

const questionDetails = await getQuestionById(params.id,false); 



  return (
    <div>
      <h1 className="h1-bold mb-10 text-dark-100 dark:text-light-900">
    Edit the Question
      </h1>
      <QuestionsForm
      questionDetails ={JSON.stringify(questionDetails)}
        type="edit"
     
        dbUserId={dbUser ? JSON.stringify(dbUser._id) : null}
      ></QuestionsForm>
    </div>
  );
};

export default EditQuestion;
