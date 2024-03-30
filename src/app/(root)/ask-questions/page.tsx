
import React from "react";
import { useFormState } from "react-dom";

import { postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import QuestionsForm from "@/components/QuestionsForm";

// function callFunc(currState, formData) {
//   const data = Object.fromEntries(formData);
//   //  router.push('/')
//   return postQuestion(data);
// }

const AskQuestion = () => {
  // let initialState = {};


  // function callFunct(currState, formData) {
  //   router.push("/");
  //   router.refresh("/");
  //   callFunc(currState, formData);
  // }

  // const [state, formAction] = useFormState<any, any>(callFunct, initialState);

  return (
    <div>
      <h1 className="h1-bold mb-10 text-dark-100 dark:text-light-900">Ask a Question</h1>
   <QuestionsForm></QuestionsForm>
    </div>
  );
};

export default AskQuestion;
