import React from "react";
import TourBackground from "../Component/TourBackground";
import Input from "../Component/Input";
import Card from "../Component/Card";
import Pagination from "../Component/Pagination";

const Tours = () => {
  return (
    <div className="">
      <TourBackground title={"All Tours"} />
      <div className="px-7 py-12 space-y-16  md:mx-[4%] xl:mx-[10%]">
        <Input />
        <Card />
        <Pagination />
      </div>
    </div>
  );
};

export default Tours;
