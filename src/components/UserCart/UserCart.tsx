import React from "react";
import Tag from "../shared/TagComponent/Tag";
import Image from "next/image";
import { IUser } from "@/database/model.db";
import Link from "next/link";

const UserCart = ({ user }: { user: IUser }) => {
  //tags - q // q- user -tag
  // user -> userId // tags- questions -

  return (
    <>
      <div className=" max-w-[15rem] rounded-lg h-[17rem] flex flex-col justify-between text-dark200_light900 border-light-600 shadow-md  items-center dark:bg-dark-200 text-center  p-5">
        <Image
          className="rounded-full"
          alt="userImage"
          src={user.picture}
          width={50}
          height={30}
        ></Image>

        <div className="desc">
          <h3 className="uppercase h2-semibold text-[16px] ">{user.name}</h3>

          <span>{`@${user.username}`}</span>
        </div>

        <div className="flex flex-col gap-2 items-center">
          {["mongoose", "develop"].map((tag) => (
            <span
              className={` shadow-sm min-w-20 rounded-sm dark:bg-dark-400  dark:border-none p-1 px-1 bg-light-700 text-[11px] text-zinc-500  dark:text-sky-300 text-center `}
            >
              {" "}
              <Link href={`/tags`} className={``}>
                {" "}
                {tag}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserCart;
