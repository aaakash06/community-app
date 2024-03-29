

import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
   
  },
  firstName: String,
  lastName: String,
  age: {
      type: Number,
      min: 18
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags:{

type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag' // Reference to the User model
}]
, 
required: true,


    }  
  
,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    upvotes: {
type: Number,
default: 0,


    },
    views: {
type: Number,
default: 0,

    },
    answers:{
type: [String],
default: []


    },
    createdAt: {
        type: Date,
        default: Date.now,

    }
});

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question' // Reference to the Question model
    }],

});

export const Tag = mongoose.models.Tag ||  mongoose.model('Tag', tagSchema);

export const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);


export const User = mongoose.models.User ||  mongoose.model('User', userSchema);