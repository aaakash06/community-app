
import { z } from "zod"
 
export const QuestionSchema = z.object({
  title: z.string().min(1).max(50),
description: z.string().max(100),
tags: z.string(),
})