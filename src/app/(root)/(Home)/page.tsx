// "use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import useTheme from "@/context/context";
import Tag from "@/components/shared/TagComponent/Tag";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import FilterDropDown from "@/components/shared/Filter/Filter";
import { HomeFilter } from "@/constants/constants";
import Cart from "@/components/shared/Cart/Cart";

import { getAllQuestions } from "@/database/actions.db";

const Home = async () => {
  const questions = await getAllQuestions();

  return (
    <>
      <div className="flex w-full  flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center mb-10 max-sm:mx-auto">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-questions">
          <Button className="primary-gradient text-light-900 float-right">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">
        <SearchBar />
        <FilterDropDown items={HomeFilter}></FilterDropDown>
      </div>

      <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
        {questions?.map((q) => {
          return <Cart key={q._id} question={q}></Cart>;
        })}
      </div>
    </>
  );
};

export default Home;
