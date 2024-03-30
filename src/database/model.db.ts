

import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends mongoose.Document {
    clerkId: string;
    name: string;
    username?: string;
    email: string;
    password?: string;
    bio?: string;
    picture: string;
    location?: string;
    portfolioWebSite?: string;
    reputation?: number;
    saved?: mongoose.Schema.Types.ObjectId[];
    joinAt: Date;
  }

  export interface IQuestion extends mongoose.Document {
    title: string;
    content: string;
    tags: mongoose.Schema.Types.ObjectId[];
    views: number;
    upvotes: mongoose.Schema.Types.ObjectId[];
    downvotes: mongoose.Schema.Types.ObjectId[];
    author: mongoose.Schema.Types.ObjectId;
    answers: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
  }

  export interface ITag extends Document {
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdOn: Date;
  }
  


const userSchema = new mongoose.Schema<IUser>({
    clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebSite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  joinAt: { type: Date, default: Date.now }
});

const questionSchema = new Schema<IQuestion>({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  const tagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdOn: { type: Date, required: true, default: Date.now }
  });

export const Tag = mongoose.models.Tag ||  mongoose.model('Tag', tagSchema);

export const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);


export const User = mongoose.models.User ||  mongoose.model('User', userSchema);