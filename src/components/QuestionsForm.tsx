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
import { postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";

const QuestionsForm = ({ dbUserId }: { dbUserId: string }) => {
  const router = useRouter();
  let type = "submit";
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      const userId = JSON.parse(dbUserId);
      const data = { ...values, userId };
      console.log(data);
      postQuestion(data);
      // console.log(userId)
    } catch (err) {
      console.log("error occured during submiting the question form");
    } finally {
      setIsSubmitting(false);
      router.push("/");
    }
    //  console.log(data)
  }

  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      console.log(tagValue);
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
    // console.log('remove was called')
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
                    initialValue=""
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
                    onKeyDown={(e) => {
                      handleTagKeyDown(e, field);
                    }}
                  />
                  <div className="flex gap-2 ">
                    {field.value.map((tag) => (
                      <div
                        className="flex bg-light-800 gap-1 dark:bg-slate-800 px-2 rounded-sm"
                        key={tag}
                        onClick={() => handleTagRemove(field, tag)}
                      >
                        <Tag item={tag} otherStyle="px-0"></Tag>{" "}
                        <Image
                          className="dark:invert"
                          src="/assets/icons/close.svg"
                          width={12}
                          height={12}
                          alt="remove"
                        />{" "}
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
          Submit the Question
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
