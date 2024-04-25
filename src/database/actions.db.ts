"use server";

import { Answer, Interaction, Question, Tag, User } from "./model.db";
import { connectToDB } from "./connect.db";
import { IQuestion, ITag } from "./model.db";
import { QuestionInterface } from "@/lib/formSchema";
import mongoose, { FilterQuery, connection, mongo } from "mongoose";
import { connect } from "http2";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { Select } from "@radix-ui/react-select";

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

export async function getAllUsers(filter?: string, page?: number) {
  try {
    let skips = (page! - 1) * 5 || 0;
    await connectToDB();

    let sortQuery = {};
    sortQuery = { joinAt: -1 };

    switch (filter) {
      case "new users":
        sortQuery = { joinAt: -1 };
        break;
      case "old users":
        sortQuery = { joinAt: 1 };
        break;

      case "top contributors":
        sortQuery = { reputations: 1 };
        break;

      default:
        break;
    }
    const users = await User.find().sort(sortQuery).skip(skips).limit(6);
    const noUsers = await User.countDocuments();
    return { users, noUsers };
  } catch (err) {
    console.log("eror occured during fetching all users from db");
    console.log(err);
  }
}

export async function editQuestions(
  id: string,
  data: { title: string; content: string }
) {
  try {
    await connectToDB();
    const qId = JSON.parse(id);
    const question = await Question.findById(qId);
    question.title = data.title;
    question.content = data.content;
    await question.save();
    revalidatePath(`/questions/${qId}`);
  } catch (err) {
    console.log("coudn't create the question");
    console.log(err);
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
        const newTag = await Tag.create({
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

    const { _id } = neww;

    for (let tagDoc of tagDocs) {
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

export const getAllQuestions = async (
  searchParams?: string,
  filter?: string,
  page?: number
) => {
  try {
    const query: FilterQuery<typeof Question> = {};

    if (searchParams) {
      query.$or = [
        { title: { $regex: new RegExp(searchParams, "i") } },
        { content: { $regex: new RegExp(searchParams, "i") } },
      ];
    }
    let skips = (page! - 1) * 5 || 0;

    let sortQuery = {};
    sortQuery = { createdAt: -1 };
    // newest recommended frequent unanswered
    await connectToDB();
    switch (filter) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "frequent":
        sortQuery = { views: -1 };
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    let allQuestions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .sort(sortQuery)
      .skip(skips)
      .limit(5);
    // console.log(allQuestions)
    const noQuestion = await Question.countDocuments(query);
    return { allQuestions, noQuestion };
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
      const user = await User.findOne({
        clerkId: "user_2ef9jMdNJEPcQjbIky6MBXJc79L",
      });
      return user;
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user by clerk id ");
  }
};
export const getUserByClerkIdAndPopulate = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ clerkId: id });
    const questions = await Question.find({ author: user._id }).populate(
      "tags"
    );
    const answers = await Answer.find({ author: user._id }).populate({
      path: "question",
      model: Question,
    });

    return { user, questions, answers };
  } catch (err) {
    console.log(err);
    console.log("error occured during fetching user by clerk id ");
  }
};

export const deleteUserByClerkId = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOneAndDelete({ clerkId: id });
    if (!user) {
      console.log("no user found to delete in db");
      return "no user found to delete in db";
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
export async function updateUserByClerk(
  id: string,
  toUpdate: {
    name: string;
    username: string;
    email: string;
    picture: string;
  }
) {
  try {
    await connectToDB();

    const mongoUser = await User.findOneAndUpdate({ clerkId: id }, toUpdate, {
      new: true,
    });
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  }
}
export async function getAllTags(
  searchParams: string,
  filter: string,
  page: number
) {
  try {
    let sortQuery = {};
    await connectToDB();

    let query: FilterQuery<typeof Tag> = {};
    if (searchParams) {
      query = { name: { $regex: new RegExp(searchParams, "i") } };
    }
    sortQuery = { createdOn: -1 };
    switch (filter) {
      case "new tag":
        sortQuery = { createdOn: -1 };
        break;
      case " old tag":
        sortQuery = { createdOn: 1 };
        break;

      default:
        break;
    }
    let skips = (page! - 1) * 5 || 0;
    const tags = await Tag.find(query).sort(sortQuery).skip(skips).limit(6);

    if (!tags) return [];

    const totalTags = await Tag.countDocuments();

    return { tags, totalTags };
  } catch (err) {
    console.log("couldn't tag all tags");
    console.log(err);
  }
}

export async function getQuestionById(qId: string, tagId: boolean = true) {
  try {
    await connectToDB();

    let question;
    if (tagId) {
      question = await Question.findById(qId)
        .populate({ path: "tags", model: Tag, select: "name _id" })
        .populate({ path: "author", model: User })
        .populate({ path: "answers", model: Answer });
    } else {
      question = await Question.findById(qId)
        .populate({ path: "tags", model: Tag, select: "name" })
        .populate({ path: "author", model: User })
        .populate({ path: "answers", model: Answer });
    }

    return question;
  } catch (err) {
    console.log("not find question with the given id ");
  }
}

export async function postAnswer(qId: string, userId: string, answerr: string) {
  try {
    await connectToDB();
    const authorId = JSON.parse(userId);
    // console.log(userId)
    // console.log(authorId)
    const answer = await Answer.create({
      author: authorId,
      content: answerr,
      question: qId,
    });
    const question = await Question.findById(qId);
    // console.log(question)
    question.answers.push(answer);
    //  console.log(question)
    await question.save();
    // revalidatePath(`/questions/${qId}`)
  } catch (err) {
    console.log(" couldn't post the answer to the db");
    console.log(err);
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
  answer?: boolean;
}

export async function handleVote(params: VoteParam, type: string) {
  try {
    await connectToDB();
    const {
      userId,
      qId,
      includesDownvotes,
      includesUpvotes,
      answer = false,
    } = params;
    if (!answer) {
      //,{ $push: { upvotes: JSON.parse(userId)} }
      // const includesUpvote = question?.upvotes.includes(userId)
      // const includesDownvote = question?.downvotes.includes(userId)

      if (!includesUpvotes && !includesDownvotes && type == "upvote") {
        const question = await Question.findByIdAndUpdate(
          qId,
          { $push: { upvotes: JSON.parse(userId!) } },
          { new: true }
        );
        // question?.upvotes.push(JSON.parse(userId!));
        // question?.save();
        // console.log(question)
      } else if (!includesUpvotes && !includesDownvotes && type == "downvote") {
        const question = await Question.findByIdAndUpdate(
          qId,
          { $push: { downvotes: JSON.parse(userId!) } },
          { new: true }
        );
        // console.log(question)
      } else if (includesUpvotes && !includesDownvotes && type == "upvote") {
        console.log("remove upvote");
        const question = await Question.findByIdAndUpdate(
          qId,
          { $pull: { upvotes: JSON.parse(userId!) } },
          { new: true }
        );
      } else if (!includesUpvotes && includesDownvotes && type == "upvote") {
        console.log("remove upvote and add downvote");

        const question = await Question.findByIdAndUpdate(
          qId,
          {
            $push: { upvotes: JSON.parse(userId!) },
            $pull: { downvotes: JSON.parse(userId!) },
          },
          { new: true }
        );
        // console.log(question)
      } else if (includesUpvotes && !includesDownvotes && type == "downvote") {
        console.log("remove upvote");
        const question = await Question.findByIdAndUpdate(
          qId,
          {
            $pull: { upvotes: JSON.parse(userId!) },
            $push: { downvotes: JSON.parse(userId!) },
          },
          { new: true }
        );

        // console.log(question)
      } else if (!includesUpvotes && includesDownvotes && type == "downvote") {
        console.log("remove upvote and add downvote");
        const question = await Question.findByIdAndUpdate(
          qId,
          { $pull: { downvotes: JSON.parse(userId!) } },
          { new: true }
        );

        // console.log(question)
      }
    } else {
      //,{ $push: { upvotes: JSON.parse(userId)} }
      // const includesUpvote = question?.upvotes.includes(userId)
      // const includesDownvote = question?.downvotes.includes(userId)

      if (!includesUpvotes && !includesDownvotes && type == "upvote") {
        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          { $push: { upvotes: JSON.parse(userId!) } },
          { new: true }
        );
        // question?.upvotes.push(JSON.parse(userId!));
        // question?.save();
        // console.log(question)
      } else if (!includesUpvotes && !includesDownvotes && type == "downvote") {
        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          { $push: { downvotes: JSON.parse(userId!) } },
          { new: true }
        );
        // console.log(question)
      } else if (includesUpvotes && !includesDownvotes && type == "upvote") {
        console.log("remove upvote");
        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          { $pull: { upvotes: JSON.parse(userId!) } },
          { new: true }
        );
      } else if (!includesUpvotes && includesDownvotes && type == "upvote") {
        console.log("remove upvote and add downvote");

        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          {
            $push: { upvotes: JSON.parse(userId!) },
            $pull: { downvotes: JSON.parse(userId!) },
          },
          { new: true }
        );
        // console.log(question)
      } else if (includesUpvotes && !includesDownvotes && type == "downvote") {
        console.log("remove upvote");
        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          {
            $pull: { upvotes: JSON.parse(userId!) },
            $push: { downvotes: JSON.parse(userId!) },
          },
          { new: true }
        );

        // console.log(question)
      } else if (!includesUpvotes && includesDownvotes && type == "downvote") {
        console.log("remove upvote and add downvote");
        const answer = await Answer.findByIdAndUpdate(
          JSON.parse(qId),
          { $pull: { downvotes: JSON.parse(userId!) } },
          { new: true }
        );
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

    revalidatePath(`/questions/${qId}`);
  } catch (err) {
    console.log(err);
    console.log("couldn't alter the upvote array");
  }
}

///// suffered a lot due to this id prop drilling make sure to pass them in pure strong like in params.id or after passing the stringified object id do parse at the end

export async function saveQuestion(qId: string, userId: string, type: string) {
  try {
    await connectToDB();
    if (type == "save") {
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { saved: qId } },
        { new: true }
      );
      console.log("saved");
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: qId } },
        { new: true }
      );
      console.log("unsaved");
    }
    revalidatePath(`/questions/${qId}`);
  } catch (err) {
    console.log(err);
    console.log("couldn't save the question");
    console.log(userId);
  }
}

export async function getSavedQuestions(
  userId: string,
  searchParams: string,
  page?: number
) {
  try {
    await connectToDB();
    let skips = (page! - 1) * 5 || 0;
    let query: FilterQuery<typeof Question> = {};
    if (searchParams) {
      query = { title: { $regex: new RegExp(searchParams, "i") } };
    }
    const noQuestionsUser = await User.findOne({ clerkId: userId });
    const noQuestion = noQuestionsUser.saved.length;
    const users = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      model: Question,
      match: query,
      options: { skip: skips, limit: 5, sort: { createdAt: -1 } },
      populate: { path: "tags", model: Tag, select: "_id name" },
    });
    const ret = users.saved;

    return { ret, noQuestion };
  } catch (err) {
    console.log(err);
    console.log("couldn't get saved questions");
  }
}
export async function increaseViewCount(
  userId: string,
  qId: string,
  type: string
) {
  try {
    await connectToDB();
    const query = { user: JSON.parse(userId), question: qId, type };
    await Question.findByIdAndUpdate(qId, { $inc: { views: 1 } });
    const existingInteraction = await Interaction.findOne(query);

    if (!existingInteraction) {
      const newInteraction = await Interaction.create(query);
    }
    revalidatePath("/");
    revalidatePath(`/questions/${qId}`);
  } catch (err) {
    console.log(err);
    console.log("couldn't execute increaseViewCount");
  }
}

export async function getTagById(
  tagId: string,
  searchParams: string,
  filter: string
) {
  try {
    await connectToDB();

    let query: FilterQuery<typeof Tag> = {};
    let sortQuery = {};
    if (searchParams) {
      query.$or = [
        { title: { $regex: new RegExp(searchParams, "i") } },
        { content: { $regex: new RegExp(searchParams, "i") } },
      ];
    }
    switch (filter) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "frequent":
        sortQuery = { views: -1 };
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      match: query,
      options: { sort: sortQuery },
      populate: { path: "tags" },
    });

    return tag;
  } catch (err) {
    console.log("couldn't tag all tags");
    console.log(err);
  }
}

export async function deleteItem(id: string, type: string) {
  try {
    await connectToDB();
    if (type == "question") {
      await Question.findByIdAndDelete(JSON.parse(id));
      await Answer.deleteMany({ question: JSON.parse(id) });
      await Interaction.deleteMany({ question: JSON.parse(id) });
      await Tag.updateMany(
        { questions: { $in: JSON.parse(id) } },
        { $pull: { questions: JSON.parse(id) } }
      );
    } else {
      await Answer.findByIdAndDelete(JSON.parse(id));
      await Question.updateMany({ $pull: { answers: JSON.parse(id) } });
      await Interaction.deleteMany({ answer: JSON.parse(id) });
    }
    revalidatePath("/profile");
  } catch (err) {
    console.log(err);
    console.log("couldn't execute the delete edit operations");
  }
}

export async function editProfile(
  id: string,
  data: {
    name: string;
    username: string;
    portfolioWebsite?: string;
    location?: string;
    bio?: string;
  }
) {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      { data },
      { new: true }
    );
    console.log(user);
    revalidatePath(`/profile`);
  } catch (err) {
    console.log("coudn't edit the profile");
    console.log(err);
  }
}
export async function getHotQuestions() {
  try {
    await connectToDB();

    const questions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return questions;
  } catch (err) {
    console.log("coudn't get hot questions");
    console.log(err);
  }
}
export async function getPopularTags() {
  try {
    await connectToDB();

    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          questions: 1,
          noOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { noOfQuestions: -1 } },
      { $limit: 8 },
    ]);
    return tags;
  } catch (err) {
    console.log("coudn't get hot questions");
    console.log(err);
  }
}
