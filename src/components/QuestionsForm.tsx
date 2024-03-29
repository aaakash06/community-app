"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionSchema } from "@/lib/formSchema";

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

const QuestionsForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
                  className="no-focus dark:border-black  dark:bg-dark-400"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem] font-bold dark:text-white">
                Question Description<span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    apiKey="6ft0u8cgpu0qthcgv7af8xi2hf20bq5hbg24gyxshx7qhyfx"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                      height: 500,
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
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
                <Input
                  className="no-focus dark:border-black  dark:bg-dark-400"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Enter the Tags releted to your question.
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionsForm;
