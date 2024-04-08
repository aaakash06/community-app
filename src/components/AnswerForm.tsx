"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/formSchema";
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
import { postAnswer, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import useTheme from "@/context/context";

const AnswerForm = ({ qId, userId }: { qId: string; userId: string|null }) => {
  const { mode } = useTheme();
  const router = useRouter();
  let type = "submit";
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    if(userId==null) router.push('/sign-up')
else{
  setIsSubmitting(true);
    try {
      await postAnswer(qId, userId, values.content);
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (err) {
      console.log("error occured during submiting the question form");
    } finally {
      router.refresh();
      setIsSubmitting(false);

      // form.setValue('content','')
    }
    //  console.log(data)
}
  
  }

  const editorRef = useRef(null);
  // console.log(editorRef);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
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
                      skin: mode == "dark" ? "oxide-dark" : "oxide",
                      content_css: mode == "dark" ? "dark" : "light",
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-blue-400 text-[12px] dark:text-white ">
                Give your Answer
              </FormDescription>
              <FormMessage className=" text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient  py-1 text-white px-6 mt-10"
          disabled={isSubmitting}
        >
          Submit the Question
        </Button>

        {isSubmitting ? (
          <div className="text-[12px] dark:text-white text-blue-500">
            Posting...
          </div>
        ) : (
          <div className="text-[12px] dark:text-white text-blue-500">
            Answer
          </div>
        )}
      </form>
    </Form>
  );
};

export default AnswerForm;
