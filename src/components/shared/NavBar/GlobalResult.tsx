import React from "react";
import Image from "next/image";
const arr = ["one", "two", "three ahaha"];

const GlobalResult = () => {
  return (
    <div className="absolute poppins text-dark100_light900 px-3 top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400 ">
      <div className="flex gap-2">
        <span>Type: </span>
        <div className="flex gap-1">
          <button>Question</button>
          <button>Answer</button>
          <button>User</button>
          <button>Tag </button>
        </div>
      </div>
      <hr className="my-3 " />
      <div>
        <h3>Top Match</h3>
<div>
{arr.map((item) => (
          <div className="flex gap-2">
            <Image
              className="invert-0"
              alt="tag"
              src="/assets/icons/tag.svg"
              width={15}
              height={10}
            ></Image>
            {item}


          </div>
        ))}
</div>
    
      </div>
    </div>
  );
};

export default GlobalResult;
