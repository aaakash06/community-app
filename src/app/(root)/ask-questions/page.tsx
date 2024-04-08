import React from "react";
import { useFormState } from "react-dom";

import { getUserByClerkId, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import QuestionsForm from "@/components/QuestionsForm";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/database/model.db";

// function callFunc(currState, formData) {
//   const data = Object.fromEntries(formData);
//   //  router.push('/')
//   return postQuestion(data);
// }

const AskQuestion = async () => {
  const { userId } = auth();


// console.log(userId)

  const dbUser = userId?  await getUserByClerkId(userId!) : null;



  // console.log(dbUser)

  // let initialState = {};

  // function callFunct(currState, formData) {
  //   router.push("/");
  //   router.refresh("/");
  //   callFunc(currState, formData);
  // }

  // const [state, formAction] = useFormState<any, any>(callFunct, initialState);

  return (
    <div>
      <h1 className="h1-bold mb-10 text-dark-100 dark:text-light-900">
        Ask a Question
      </h1>
      <QuestionsForm dbUserId={ dbUser?  JSON.stringify(dbUser._id): null}></QuestionsForm>
    </div>
  );
};

export default AskQuestion;
