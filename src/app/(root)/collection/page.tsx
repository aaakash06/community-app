import React from "react";
import { auth } from "@clerk/nextjs";
import { getSavedQuestions } from "@/database/actions.db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import FilterDropDown from "@/components/shared/Filter/Filter";
import { HomeFilter } from "@/constants/constants";
import Cart, { QuestionType } from "@/components/shared/Cart/Cart";
import mongoose from "mongoose";
import { IQuestion } from "@/database/model.db";
import Image from "next/image";
import ImageComponent from "@/components/ImageComponent";
import Paginate from "@/components/shared/paginate";

const Collections = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const { userId } = auth();

  const { ret: questions, noQuestion }: any = await getSavedQuestions(
    userId!,
    searchParams.q,
    +searchParams.page
  );
  // console.log(noQuestion);
  const noQuestions = noQuestion < 5 ? 1 : noQuestion || 0;
  // we will paginate by 5 per page
  const noPage = Math.floor(noQuestions / 5) + (noQuestions % 5);
  // console.log(questions);
  // console.log(noQuestions);
  return (
    <>
      <div className="flex w-full  flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center mb-10 max-sm:mx-auto">
        <h1 className="h1-bold text-dark100_light900 max-sm:text-[20px]">
          Saved Questions
        </h1>
        <div>
          <Link href="/ask-questions" className="float-right ">
            <Button className="primary-gradient text-light-900 ">
              Ask a Question
            </Button>
          </Link>
        </div>
      </div>

      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">
        <SearchBar route={`/collection`} />
        <FilterDropDown items={HomeFilter}></FilterDropDown>
      </div>
      {questions?.length == 0 ? (
        <div className="mt-20">
          <ImageComponent></ImageComponent>

          <p className="mt-10 text-center text-xl poppins text-primary-500">
            {" "}
            There is no saved question to show
          </p>
        </div>
      ) : (
        <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
          {questions?.map((q: QuestionType) => {
            return (
              <Link key={q.title} href={`questions/${q._id}`}>
                {" "}
                <Cart question={q}></Cart>
              </Link>
            );
          })}
        </div>
      )}

      {questions.length > 0 && (
        <Paginate route="/community" noPage={noQuestions} />
      )}
    </>
  );
};

export default Collections;
