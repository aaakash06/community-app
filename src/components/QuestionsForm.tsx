"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionSchema } from "@/lib/formSchema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tag from "./shared/TagComponent/Tag";
import { editQuestions, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import useTheme from "@/context/context";
import { Content } from "next/font/google";


interface Props {
  dbUserId: string | null;
  type: string;
  questionDetails?: string | any;

}

const QuestionsForm = ({
  dbUserId,
  type,
  questionDetails,

}: Props) => {
  const { mode } = useTheme();

  const router = useRouter();

let newTags : string[] =[]; 

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  if (questionDetails){

    questionDetails = JSON.parse(questionDetails);
    const {tags}= questionDetails; 
  //@ts-ignore
    const newTagss : string[] =  tags.map(el => {
     return el.name; 
    })

newTags = newTagss; 
  } 

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: questionDetails?.title || "",
      content: '',
      tags: newTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    if (dbUserId == null) router.push("/sign-up");
    else {


      
      setIsSubmitting(true);
      try {
        const userId = JSON.parse(dbUserId);
        const data = { ...values, userId };
if(type=="submit")
        await postQuestion(data);
      else await editQuestions(JSON.stringify(questionDetails._id), {title: values.title , content: values.content}); 
      } catch (err) {
        console.log("error occured during submiting the question form");
      } finally {
       type=='submit'? router.push("/") : router.push(`/questions/${questionDetails._id}`); 
        setIsSubmitting(false);
      }
    }
  }

  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          //as never why?
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  function handleTagRemove(
    field: ControllerRenderProps<
      {
        title: string;
        content: string;
        tags: string[];
      },
      "tags"
    >,
    name: string
  ) {
    const newFieldValue = field.value.filter((tag) => tag !== name);
    form.setValue("tags", newFieldValue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                Quetion Title <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Enter your Questions title.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                Question Description<span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    apiKey="6ft0u8cgpu0qthcgv7af8xi2hf20bq5hbg24gyxshx7qhyfx"
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    onInit={(evt, editor) => {
                      //@ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue={questionDetails?.content || ""}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo |  " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }  ",
                      skin: mode == "dark" ? "oxide-dark" : "oxide",
                      content_css: mode == "dark" ? "dark" : "light",
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Describe your Question as elaboratly as possible so people might
                help you better.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                {" "}
                Questions Tags <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    disabled={type=="edit"}
                    onKeyDown={(e) => {
                      handleTagKeyDown(e, field);
                    }}
                  />
                  <div className="flex gap-2 ">
                    {field.value.map((tag) => (
                      <div
                        className="flex bg-light-800 gap-1 dark:bg-slate-800 px-2 rounded-sm"
                        key={tag}
                        onClick={() => 
                          
                          type=="submit" && handleTagRemove(field, tag)}
                      >
                        <span className="shadow-sm  dark:bg-dark-400  dark:border-none p-1 px-1 bg-light-800 text-[11px] text-zinc-500  dark:text-sky-300 text-center">
                          {" "}
                          {tag}
                        </span>
                        {
                          type=='submit' &&    <Image
                          className="dark:invert"
                          src="/assets/icons/close.svg"
                          width={12}
                          height={12}
                          alt="remove"
                        />
                        }
                     
                      </div>
                    ))}
                  </div>
                </>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Enter the Tags releted to your question.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient py-1 text-white px-6 mt-10"
          disabled={isSubmitting}
        >
          {type == "submit" ? "Submit the Question" : "Edit the Question"}
        </Button>

        {isSubmitting ? (
          type == "submit" ? (
            <div className="text-[12px] dark:text-white text-blue-500">
              Posting...
            </div>
          ) : (
            <div className="text-[12px] dark:text-white text-blue-500">
              Editing
            </div>
          )
        ) : type == "submit" ? (
          <div className="text-[12px] dark:text-white text-blue-500">
            Submit the question
          </div>
        ) : (
          <div className="text-[12px] dark:text-white text-blue-500">
            Edit the Question
          </div>
        )}
      </form>
    </Form>
  );
};

export default QuestionsForm;
