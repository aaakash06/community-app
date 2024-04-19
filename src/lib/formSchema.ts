import mongoose from "mongoose";
import { string, z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().max(1000),
  tags: z
    .array(z.string().min(1).max(15))
    .max(3, { message: "Can not add more tags than 3" }),
});
export const UserSchema = z.object({
 name: z.string().min(1).max(50),
 username: z.string().min(1).max(50),
 portfolioWebsite: z.string(),
 location: z.string(),
 bio: z.string(),
});
export const AnswerSchema = z.object({
  content: z.string().min(1).max(1000),
});

export interface QuestionInterface {
  title: string;
  content: string;
  tags: string[];
  userId: mongoose.Schema.Types.ObjectId;
}
