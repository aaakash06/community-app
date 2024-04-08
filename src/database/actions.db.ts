"use server";

import { Answer, Question, Tag, User } from "./model.db";
import { connectToDB } from "./connect.db";
import { IQuestion, ITag } from "./model.db";
import { QuestionInterface } from "@/lib/formSchema";
import mongoose, { mongo } from "mongoose";
import { connect } from "http2";
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

export async function getAllUsers(){
  try {
    await connectToDB();
    const users = await User.find().sort({joinAt: -1});

    return users;
  } catch (err) {
    console.log('eror occured during fetching all users from db')
    console.log(err)
  }
}

export async function postQuestion(data: QuestionInterface) {
  try {
    await connectToDB();
    //getUserinfo

    const tagArray: mongoose.Schema.Types.ObjectId[] = [];
    const tagsArray: string[] = [...data.tags];
    const tagDocs: ITag[] = []; 
    // console.log(data.tags)

    // let tagName;
    for (let tagName of tagsArray) {
      let tagFound = await Tag.findOne({ name: tagName });

      if (tagFound) {
        console.log("seems tag has been found ");
        console.log(tagFound);
        tagArray.push(tagFound._id);
        tagDocs.push(tagFound); 
        console.log("tag added to the array");
      } else {
        console.log("coudn't find the tag");
        console.log("creating new tag");
    const newTag  = await Tag.create({
          name: tagName,
        });
        tagDocs.push(newTag); 
        tagArray.push(await newTag._id);
        console.log("new tag created");
      }
    }

    // console.log(tagArray);
    const neww = await Question.create({
      ...data,
      tags: tagArray,
      author: data.userId,
    });

    const {_id} = neww; 

   for(let tagDoc of tagDocs){
tagDoc.questions.push(_id); 
await tagDoc.save(); 
   }
    
    // console.log(neww);
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
      const user = await User.findOne({ clerkId: "user_2ef9jMdNJEPcQjbIky6MBXJc79L" });
      return user;
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user by clerk id ");
  }
};
export const deleteUserByClerkId= async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOneAndDelete({ clerkId: id });
    if (!user) {
    console.log('no user found to delete in db')
    return 'no user found to delete in db' 
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user and deleting by id ");
    console.log(err); 
  }
};

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  try {
    // console.log(userId)   await connectToDB();
    const user = await User.findById(userId);
    // console.log('the required user is ')
    //   console.log('user got')
    // console.log(user)
    return user;
  } catch (err) {
    console.log("not find user with the given user id ");
  }
}
export async function getUserNameById(userId: mongoose.Schema.Types.ObjectId) {
  try {
    // console.log(userId)
       await connectToDB();
    const user = await User.findById(userId);
    // console.log('the required user is ')
    //   console.log('user got')
    // console.log(user)
    return user.name;
  } catch (err) {
    console.log("not find username with the given id ");
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


    console.log(user);

    const mongoUser = await User.create(user);
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  } 
}
export async function updateUserByClerk(id:string, toUpdate:   {
  name: string; 
  username: string; 
  email: string; 
  picture: string; 
}  ) {
  try {
    await connectToDB();


    const mongoUser = await User.findOneAndUpdate({clerkId: id}, toUpdate, {new: true});
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  } 
}
export async function getAllTags() {
  try {
    await connectToDB();
const tags = Tag.find().sort({createdOn:-1}); 
if(!tags) return []; 
return tags; 
 
  } catch (err) {
    console.log("couldn't tag all tags");
    console.log(err);
  } 
}



export async function getQuestionById(qId: string) {
  try {   await connectToDB();

    // console.log(typeof qId)
    const question = await Question.findById(qId).populate({path: "tags" , model: Tag, select: 'name _id'}).populate({path: 'author', model: User}).populate({path: 'answers', model: Answer});
  // console.log(question); 

    // console.log('the required user is ')
    //   console.log('user got')
    // console.log(user)
    return question;
  } catch (err) {
    console.log("not find question with the given id ");
  }
}


export async function postAnswer(qId: string, userId: string,  answerr: string){

  try {   await connectToDB();
    const authorId = JSON.parse(userId); 
    // console.log(userId)
    // console.log(authorId)
const answer = await Answer.create({author: authorId, content: answerr, question: qId })
    const question = await Question.findById(qId); 
// console.log(question)
 question.answers.push(answer);
//  console.log(question) 
await question.save(); 
  // revalidatePath(`/questions/${qId}`)
  } catch (err) {
    console.log(" couldn't post the answer to the db");
    console.log(err)
  }


}


//objectId -> stringify -> string-> parse -> string ; here userId

interface VoteParam {

    upvotes: number;
    downvotes: number;
    includesUpvotes: boolean; 
    includesDownvotes: boolean; 
    userId: string | null;
    qId: string;
    hasSaved?: boolean;
answer? : boolean; 

}

export async function handleVote(params: VoteParam  , type: string) {
  try {
    await connectToDB();
    const { userId, qId,  includesDownvotes ,includesUpvotes, answer=false} = params;
    if(!answer){
    
      //,{ $push: { upvotes: JSON.parse(userId)} }
      // const includesUpvote = question?.upvotes.includes(userId)
      // const includesDownvote = question?.downvotes.includes(userId)
      
      
      
      if(!includesUpvotes && !includesDownvotes && type== 'upvote') {
        const question= await Question.findByIdAndUpdate(qId, { $push: { upvotes: JSON.parse(userId!) }}, {new: true});
      // question?.upvotes.push(JSON.parse(userId!)); 
      // question?.save(); 
      // console.log(question)
      }
      else if(!includesUpvotes && !includesDownvotes && type== 'downvote') {
      
        const question= await Question.findByIdAndUpdate(qId, { $push: { downvotes: JSON.parse(userId!) }}, {new: true});
        // console.log(question)
      }
      
      
      else if(includesUpvotes && !includesDownvotes && type== 'upvote') {
        console.log('remove upvote')
        const question= await Question.findByIdAndUpdate(qId, { $pull :{ upvotes: JSON.parse(userId!) }}, {new: true});
      }
      
      else if(!includesUpvotes && includesDownvotes && type== 'upvote') {
        console.log('remove upvote and add downvote')
      
      const question= await Question.findByIdAndUpdate(qId,{$push: { upvotes: JSON.parse(userId!) },$pull: { downvotes: JSON.parse(userId!) }}, {new: true});
      // console.log(question)
      }
      
      
      
      else if(includesUpvotes && !includesDownvotes && type== 'downvote') {
        console.log('remove upvote')
        const question= await Question.findByIdAndUpdate(qId,{$pull: { upvotes: JSON.parse(userId!) },$push: { downvotes: JSON.parse(userId!) }}, {new: true});
      
        // console.log(question)
      }
      
      else if (!includesUpvotes && includesDownvotes && type== 'downvote') 
      {
        console.log('remove upvote and add downvote')
        const question= await Question.findByIdAndUpdate(qId, { $pull :{ downvotes: JSON.parse(userId!) }}, {new: true});
      
        // console.log(question)
      }
      

    }
    else{


    
//,{ $push: { upvotes: JSON.parse(userId)} }
// const includesUpvote = question?.upvotes.includes(userId)
// const includesDownvote = question?.downvotes.includes(userId)



if(!includesUpvotes && !includesDownvotes && type== 'upvote') {
  const answer= await Answer.findByIdAndUpdate(JSON.parse(qId), { $push: { upvotes: JSON.parse(userId!) }}, {new: true});
// question?.upvotes.push(JSON.parse(userId!)); 
// question?.save(); 
// console.log(question)
}
else if(!includesUpvotes && !includesDownvotes && type== 'downvote') {

  const answer= await Answer.findByIdAndUpdate(JSON.parse(qId), { $push: { downvotes: JSON.parse(userId!) }}, {new: true});
  // console.log(question)
}


else if(includesUpvotes && !includesDownvotes && type== 'upvote') {
  console.log('remove upvote')
  const answer= await Answer.findByIdAndUpdate(JSON.parse(qId), { $pull :{ upvotes: JSON.parse(userId!) }}, {new: true});
}

else if(!includesUpvotes && includesDownvotes && type== 'upvote') {
  console.log('remove upvote and add downvote')

const answer= await Answer.findByIdAndUpdate(JSON.parse(qId),{$push: { upvotes: JSON.parse(userId!) },$pull: { downvotes: JSON.parse(userId!) }}, {new: true});
// console.log(question)
}



else if(includesUpvotes && !includesDownvotes && type== 'downvote') {
  console.log('remove upvote')
  const answer= await Answer.findByIdAndUpdate(JSON.parse(qId),{$pull: { upvotes: JSON.parse(userId!) },$push: { downvotes: JSON.parse(userId!) }}, {new: true});

  // console.log(question)
}

else if (!includesUpvotes && includesDownvotes && type== 'downvote') 
{
  console.log('remove upvote and add downvote')
  const answer= await Answer.findByIdAndUpdate(JSON.parse(qId), { $pull :{ downvotes: JSON.parse(userId!) }}, {new: true});

  // console.log(question)
}

    }
    

// if(includes){
//   let  {upvotes}  = question; 
//   upvotes  = upvotes.filter(el  => el!==userId )!; 
//   console.log(upvotes)
// question.upvotes = upvotes; 
// console.log(upvotes)
// question?.save(); 

// }
// else{


// }





revalidatePath(`/questions/${qId}`)

  } catch (err) {
    console.log(err)
    console.log("couldn't alter the upvote array");
 
  }
}



///// suffered a lot due to this id prop drilling make sure to pass them in pure strong like in params.id or after passing the stringified object id do parse at the end



export async function saveQuestion(qId: string, userId: string, type: string) {
  try {   
    await connectToDB();
// console.log(qId)


if(type=='save'){
  const user = await User.findByIdAndUpdate(userId,{ $push: {saved:qId } },{new: true})
  console.log('saved')
  // console.log(user)
}
else{
  const user = await User.findByIdAndUpdate(userId,{ $pull: {saved:qId } },{new: true})
  console.log('unsaved')
  // console.log(user)
}

// const user = await User.findById(JSON.parse(userId))
//  console.log(user)
revalidatePath(`/questions/${qId}`)

  } catch (err) {
 
    console.log(err)
    console.log("couldn't save the question");
  console.log(userId)
  }
}


