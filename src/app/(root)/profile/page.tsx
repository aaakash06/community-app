import Cart from "@/components/shared/Cart/Cart";
import { getUserByClerkIdAndPopulate } from "@/database/actions.db";
import { auth } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnswerCart from "@/components/AnswerCart";
import ParseHTML from "@/components/ParseHTML";
import Link from "next/link";
import ProfileAnswerCart from "@/components/ProfileAnswerCart";

const Profile = async () => {
  const { userId } = auth();

  const { user, questions, answers }: any = await getUserByClerkIdAndPopulate(
    userId!
  );

  // console.log(user)
  return (
    <>
      <div className="flex  justify-between max-sm:flex-col max-sm:gap-4">
        <div className="flex  gap-3">
          <Image
            className="rounded-full"
            src={user.picture}
            width={120}
            height={100}
            alt="profile-pic"
          ></Image>

          <div className="flex flex-col gap-4 px-1 py-2">
            <div className="flex flex-col">
              <span className="h3-bold text-dark200_light900">{user.name}</span>
              <span className="text-dark200_light900 text-sm max-md:flex-row ">
                @{user.username}
              </span>
            </div>
            <div className="flex gap-1">
              <Image
                className="rounded-full invert  dark:invert-0"
                src="/assets/icons/calendar.svg"
                width={20}
                height={20}
                alt="profile-pic"
              ></Image>
              <span className="text-dark200_light900 text-sm pl-1">
                {user.joinAt.toDateString()}
              </span>
            </div>
          </div>
        </div>

        <Button className="bg-light-700 dark:bg-dark-400 px-5 dark:text-white">
          {" "}
          Edit Profile
        </Button>
      </div>
      <h4 className="font-bold text-xl mt-10 mb-3 dark:text-white">Stats</h4>

      <div className="Stats  grid grid-cols-4 gap-3 max-md:grid-cols-2 ">
        <div className="flex flex-col gap-5  shadow-sm items-center justify-center bg-light-900 py-3 max-w-[12rem] dark:bg-dark-300 dark:text-white rounded-md text-sm max-md:flex-row  max-sm:gap-4  max-md:gap-7  ">
          <div className="flex flex-col  ">
            {" "}
            <span className="text-center">{questions.length}</span>
            <span className="text-center">Questions</span>{" "}
          </div>
          <div className="flex flex-col">
            {" "}
            <span className="text-center">{questions.length}</span>
            <span className="text-center">Answers</span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2  shadow-sm items-center bg-light-900 py-3 max-w-[12rem] dark:bg-dark-300 dark:text-white rounded-md text-sm max-md:flex-row  max-sm:gap-4  max-md:gap-7 px-5 ">
          <Image
            src="/assets/icons/gold-medal.svg"
            width={50}
            height={50}
            alt="gold-badge"
          ></Image>
          <span>0</span>
          <span>Gold Badge</span>{" "}
        </div>
        <div className="flex flex-col gap-2  shadow-sm items-center bg-light-900 py-3 max-w-[12rem] dark:bg-dark-300 dark:text-white rounded-md text-sm max-md:flex-row  max-sm:gap-4  max-md:gap-7 px-5 ">
          <Image
            src="/assets/icons/silver-medal.svg"
            width={50}
            height={50}
            alt="gold badge"
          ></Image>
          <span>0</span>
          <span>Silver Badge</span>{" "}
        </div>
        <div className="flex flex-col gap-2  shadow-sm items-center bg-light-900 py-3 max-w-[12rem] dark:bg-dark-300 dark:text-white rounded-md text-sm max-md:flex-row  max-sm:gap-4  max-md:gap-7 px-5 ">
          <Image
            src="/assets/icons/bronze-medal.svg"
            width={50}
            height={50}
            alt="gold badge"
          ></Image>
          <span>0</span>
          <span>Bronze Badge</span>{" "}
        </div>
      </div>

      {/* focus:bg-light-800 dark:focus:bg-dark-100  dark:hover:bg-dark-200 */}

      <div>
        <Tabs defaultValue="Questions" className="w-full mt-10 shadow-sm">
          <TabsList className="bg-light-800 dark:bg-dark-300 ">
            <TabsTrigger value="Questions" className="tab">
              Questions
            </TabsTrigger>
            <TabsTrigger value="Answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Questions">
            <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
              {questions.length == 0 ? (
                <p>No questions posted yet</p>
              ) : (
                questions?.map(
                  //@ts-ignore
                  (q) => {
                    return (
                      <Cart
                        edit={true}
                        key={q._id}
                        //@ts-ignore
                        question={q}
                      ></Cart>
                    );
                  }
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="Answers">
            <div className="carts flex flex-col text-sm gap-10 mt-10 text-dark100_light900 ">
              {answers.length == 0 ? (
                <p>No answers posted yet</p>
              ) : (
                //@ts-ignore
                answers.map((ans) => (
                  <div
                    key={ans}
                    className="mt-5 flex flex-col gap-2 dark:bg-dark-300 p-5 rounded-md py-7 shadow-md dark:shadow-none"
                  >
                    <h2 className="font-bold text-xl mb-4">
                      {" "}
                      <Link href={`/questions/${ans.question._id}`}>
                        {ans.question.title}
                      </Link>{" "}
                    </h2>
                    <ProfileAnswerCart
                      prop={{ userId: JSON.stringify(user._id) }}
                      ans={ans}
                    ></ProfileAnswerCart>{" "}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
