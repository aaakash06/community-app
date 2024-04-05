"use server";

import { Question, Tag, User } from "./model.db";
import { connectToDB } from "./connect.db";
import { IQuestion } from "./model.db";
import { QuestionInterface } from "@/lib/formSchema";
import mongoose, { mongo } from "mongoose";
import { connect } from "http2";
import { useId } from "react";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

type QuestionType = {
  title: string;
  content: string;
  tags: mongoose.Schema.Types.ObjectId[];
  views: number;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  author: mongoose.Schema.Types.ObjectId;
  answers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
};

export async function getAllUsers() {
  try {
    await connectToDB();
    const users = await User.find();
    // console.log('The Users are: ')
    // console.log(users)
    return users;
  } catch (err) {
    console.log("error occured during getting all users");
  }
}

export async function postQuestion(data: QuestionInterface) {
  try {
    await connectToDB();
    //getUserinfo

    const tagArray: mongoose.Schema.Types.ObjectId[] = [];
    const tagsArray: string[] = [...data.tags];
    // console.log(data.tags)

    // let tagName;
    for (let tagName of tagsArray) {
      let tagFound = await Tag.findOne({ name: tagName });

      if (tagFound) {
        console.log("seems tag has been found ");
        console.log(tagFound);
        tagArray.push(tagFound._id);
        console.log("tag added to the array");
      } else {
        console.log("coudn't find the tag");
        console.log("creating new tag");
        const newTag = await Tag.create({
          name: tagName,
        });
        tagArray.push(await newTag._id);
        console.log("new tag created");
      }
    }

    console.log(tagArray);
    const neww = await Question.create({
      ...data,
      tags: tagArray,
      author: data.userId,
    });
    console.log(neww);
    revalidatePath("/");
    //  return users;
  } catch (err) {
    console.log("coudn't create the question");
    console.log(err);
  }
  // console.log('hello')
}

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    let allQuestions = await Question.find()
      .populate({ path: "tags", model: Tag })
      .sort({ createdAt: -1 });
    // console.log(allQuestions)
    return allQuestions;
  } catch (err) {
    console.log("coudn't fetch posts");
    console.log(err);
  }
};

export const getUserByClerkId = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      const user = await User.findOne({ clerkId: "123456" });
      return user;
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user by id ");
  }
};

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  try {
    // console.log(userId)
    const user = await User.findById(userId);
    // console.log('the required user is ')
    //   console.log('user got')
    // console.log(user)
    return user;
  } catch (err) {
    console.log("not find user with the given id ");
  }
}

interface CreateUserClerkType {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export async function createUserByClerk(user: CreateUserClerkType) {
  try {
    await connectToDB();
    console.log(
      "the control did reached the try block for creating userByclerk"
    );

    console.log(user);

    const mongoUser = await User.create(user);
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  } finally {
    console.log("the control did reach finally block");
  }
}
