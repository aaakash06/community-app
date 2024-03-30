"use server";

import { Question, Tag, User } from "./model.db";
import { connectToDB } from "./connect.db";
import { IQuestion } from "./model.db";
import { QuestionInterface} from "@/lib/formSchema";
import mongoose from "mongoose";

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

export async function postQuestion(data : QuestionInterface) {
  try {
    await connectToDB();
    const tagArray : mongoose.Schema.Types.ObjectId[]=[]; 
    const tagsArray: string[] =data.tags;
    // console.log(data.tags)
   
      let tagName;
      for (tagName of tagsArray) {
        let tagFound = await Tag.find({ name: tagName });

        if (tagFound) {
          console.log("seems tag has been found ");
          console.log(tagFound);
          tagArray.push(tagFound);
          console.log("tag added to the array");
        } else {
          console.log("coudn't find the tag");
          const newTag = await Tag.create({
            title: tagName,
           
          });
          tagArray.push(await newTag._id);
          console.log("new tag created");
        }
      }
  

    const newQuestion = { ...data, user: "6602eee1867983913fafb0e1" };
    console.log(tagArray);
    const neww = await Question.create({ ...newQuestion, tags: tagArray });
    console.log(neww);
    //  return users;
  } catch (err) {
    console.log("coudn't create the question");
    console.log(err);
  }
  // console.log('hello')
}

export const getAllQuestions = async (): IQuestion[] => {
  try {
    await connectToDB();
    let allQuestions = await Question.find();
    // console.log(allQuestions)
    return allQuestions;
  } catch (err) {
    console.log("coudn't fetch posts");
    console.log(err);
  }
};
