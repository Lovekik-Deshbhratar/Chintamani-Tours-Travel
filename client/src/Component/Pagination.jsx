import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-5  font-semibold">
        <span className="bg-secondary ring-1 ring-secondary text-white w-8 h-8 flex justify-center items-center rounded-full">
          1
        </span>
        <span className="w-8 h-8 flex justify-center ring-1 ring-secondary items-center rounded-full">
          2
        </span>
      </div>
    </div>
  );
};

export default Pagination;
