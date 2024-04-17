import React from "react";

import { getUserByClerkId, postQuestion } from "@/database/actions.db";

import QuestionsForm from "@/components/QuestionsForm";
import { auth } from "@clerk/nextjs";

const AskQuestion = async () => {
  const { userId } = auth();

  const dbUser = userId ? await getUserByClerkId(userId!) : null;

  return (
    <div>
      <h1 className="h1-bold mb-10 text-dark-100 dark:text-light-900">
        Ask a Question
      </h1>
      <QuestionsForm
        type="submit"
        dbUserId={dbUser ? JSON.stringify(dbUser._id) : null}
      ></QuestionsForm>
    </div>
  );
};

export default AskQuestion;
