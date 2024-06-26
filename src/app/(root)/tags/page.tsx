import TagCart from "@/components/TagCart/TagCart";
import FilterDropDown from "@/components/shared/Filter/Filter";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import { getAllTags } from "@/database/actions.db";
import React from "react";
import { ITag } from "@/database/model.db";
import Link from "next/link";
import Paginate from "@/components/shared/paginate";

const filter = ["New Tag", " Old Tag"];

const Tags = async ({
  searchParams,
}: {
  searchParams: { q: string; filter?: string; page: string };
}) => {
  const { tags: allTags, totalTags }: any = await getAllTags(
    searchParams.q,
    searchParams.filter!,
    +searchParams.page!
  );

  // we will paginate by 5 per page
  const noPage =
    totalTags < 6 ? 1 : Math.floor(totalTags / 6) + (totalTags % 6);

  return (
    <div>
      <div className="flex w-full  flex-col justify-between gap-5 sm:flex-row sm:items-center mb-10">
        <h1 className="h1-bold text-dark100_light900"> All Tags</h1>
      </div>

      <div className="mid flex gap-4  flex-col max-md:flex-row max-sm:flex-col">
        <SearchBar route="/tags" />
        <FilterDropDown items={filter} tags={false}></FilterDropDown>
      </div>

      {allTags?.length == 0 ? (
        <p className="text-xl h2-bold font-spaceGrotesk text-center mt-20 text-primary-500 w-full">
          {" "}
          No tag Found
        </p>
      ) : (
        <div className="mt-10 max-lg:w-[70%] max-md:w-full  grid grid-cols-2 lg:grid-cols-3 gap-4 max-lg:gap-10">
          {allTags?.map((tag: any) => {
            return (
              <Link href={`/tags/${tag._id}`} key={tag.name}>
                {" "}
                <TagCart tag={tag}></TagCart>
              </Link>
            );
          })}
        </div>
      )}
      <Paginate route="/" noPage={noPage} />
    </div>
  );
};

export default Tags;
