import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import useTheme from "@/context/context";
import Tag from "@/components/shared/TagComponent/Tag";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import FilterDropDown from "@/components/shared/Filter/Filter";
import { HomeFilter } from "@/constants/constants";
import Cart, { QuestionType } from "@/components/shared/Cart/Cart";
import { getAllQuestions } from "@/database/actions.db";
import { ContextType } from "react";
import ImageComponent from "@/components/ImageComponent";
import Paginate from "@/components/shared/paginate";
import { IQuestion } from "@/database/model.db";
import { Question } from "@/database/model.db";

const Home = async ({
  searchParams,
}: {
  searchParams: { q: string; filter?: string; page: string };
}) => {
  const { allQuestions: questions, noQuestion }: any =
    (await getAllQuestions(
      searchParams.q,
      searchParams.filter,
      +searchParams.page
    )) || [];
  const noQuestions = noQuestion || 0;
  // we will paginate by 5 per page
  const noPage = Math.floor(noQuestions / 5) + (noQuestions % 5);

  return (
    <>
      <div className="flex w-full  flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center mb-10 max-sm:mx-auto">
        <h1 className="h1-bold text-dark100_light900 max-sm:text-[20px]">
          All Questions
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
        <SearchBar route={`/`} />
        <FilterDropDown items={HomeFilter}></FilterDropDown>
      </div>

      {questions?.length == 0 ? (
        <div className="mt-20">
          <ImageComponent></ImageComponent>

          <p className="mt-10 text-center text-xl poppins text-primary-500">
            {" "}
            There is no question to show
          </p>
        </div>
      ) : (
        <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
          {questions?.map((q: QuestionType) => {
            return <Cart key={q.title} question={q}></Cart>;
          })}
        </div>
      )}

      <Paginate route="/" noPage={noPage} />
    </>
  );
};

export default Home;
