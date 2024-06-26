import UserCart from "@/components/UserCart/UserCart";
import FilterDropDown from "@/components/shared/Filter/Filter";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { HomeFilter } from "@/constants/constants";
import { getAllUsers } from "@/database/actions.db";
import Link from "next/link";
import React from "react";
import { IUser } from "@/database/model.db";
import Paginate from "@/components/shared/paginate";

const filter = ["New Users", " Old Users", "Top Contributors"];

const Community = async ({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string };
}) => {
  const { users, noUsers }: any = await getAllUsers(
    searchParams?.filter!,
    +searchParams?.page!
  );

  // we will paginate by 5 per page
  const noPage = noUsers < 6 ? 1 : Math.floor(noUsers / 6) + (noUsers % 6);

  return (
    <div>
      <div className="flex w-full  flex-col justify-between gap-5 sm:flex-row sm:items-center mb-10 ">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">
        <FilterDropDown items={filter} tags={false}></FilterDropDown>
      </div>
      <div className="mt-10 grid gap-x-5 max-md:grid-cols-2 gap-y-4 grid-cols-3">
        {users?.map((user: IUser) => {
          return <UserCart key={user.name} user={user}></UserCart>;
        })}
      </div>
      <Paginate route="/" noPage={noPage} />
    </div>
  );
};

export default Community;
