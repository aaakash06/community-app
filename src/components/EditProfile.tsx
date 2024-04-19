"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "@/lib/formSchema";
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
import { editProfile, editQuestions, postQuestion } from "@/database/actions.db";
import { useRouter } from "next/navigation";
import useTheme from "@/context/context";
import { Content } from "next/font/google";


interface Props {
  
  userDetails?: string | any;

}

const EditProfile = ({
  userDetails,
}: Props) => {
  const { mode } = useTheme();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  if (userDetails) userDetails = JSON.parse(userDetails);
 

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: userDetails?.name || "",
      username: userDetails?.username || "",
      portfolioWebsite: userDetails?.portfolioWebsite || "",
      location: userDetails?.location || "",
      bio: userDetails?.bio || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserSchema>) {
      setIsSubmitting(true);
      try {
        
    

        await editProfile(userDetails.clerkId, values); 
     

      } catch (err) {
        console.log("error occured during submiting the editProfile form");
      } finally {
     router.push(`/profile`); 
        setIsSubmitting(false);
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-bold dark:text-white">
                  Name <span className="text-red-500">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    {...field}
                  />
                </FormControl>
               
                <FormMessage className=" text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-bold dark:text-white">
                  Username <span className="text-red-500">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    {...field}
                  />
                </FormControl>
               
                <FormMessage className=" text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-bold dark:text-white">
                  Portfolio Website 
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    {...field}
                  />
                </FormControl>
               
                <FormMessage className=" text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-bold dark:text-white">
                  Location 
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    {...field}
                  />
                </FormControl>
               
                <FormMessage className=" text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-bold dark:text-white">
                  Bio 
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus dark:text-white dark:border-black  dark:bg-dark-400"
                    {...field}
                  />
                </FormControl>
               
                <FormMessage className=" text-red-500" />
              </FormItem>
            )}
          />
        
  
          <Button
            type="submit"
            className="primary-gradient py-1 text-white px-6 mt-10"
            disabled={isSubmitting}
          >
            "Edit Your Profile"
          </Button>
  
          {isSubmitting ? 
            (
              <div className="text-[12px] dark:text-white text-blue-500">
                Editing
              </div>
            )
          :  (
            <div className="text-[12px] dark:text-white text-blue-500">
              Apply Edits
            </div>
          )}
        </form>
      </Form>
    )

  }

  


export default EditProfile;
