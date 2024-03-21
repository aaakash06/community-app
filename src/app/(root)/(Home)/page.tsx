"use client";
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
import { Key } from "lucide-react";


const questions = [
  {
    _id: '1',
    title: 'Cascading Deletes in SQLAlchemy? I am stuck with this problem for about half a day already',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' }
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      picture: 'john-doe.jpg'
    },
    upvotes: 1234,
    views: 500,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z')
  },
  {
    _id: '2',
    title: 'How to center a div?',
    tags: [
      { _id: '3', name: 'css' },
      { _id: '4', name: 'html' }
    ],
    author: {
      _id: '2',
      name: 'Jane Smith',
      picture: 'jane-smith.jpg'
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date('2021-09-02T10:30:00.000Z')
  }
];





const Home = () => {
  return (
<>

<div className="flex w-full  flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center mb-10">
<h1 className="h1-bold text-dark100_light900">All Questions</h1>  
<Link href="/ask-questions">
<Button className="primary-gradient text-light-900 float-right">Ask a Question</Button>
</Link>

      </div>

<div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">

<SearchBar/>
<FilterDropDown items={HomeFilter}></FilterDropDown>

</div>

      <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">

   {
    questions.map(q => {
return (

<Cart key={q._id} question={q}></Cart>

)

    } )
   } 
    
      </div>

    </>
  );
};

export default Home;
