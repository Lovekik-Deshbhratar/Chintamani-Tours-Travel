import React from "react";
import Input from "../Component/Input";

const Landing = () => {
  return (
    <div className="px-7 py-4 space-y-5">
      <div className="grid grid-cols-1 gap-6">
        <span className="border py-1 px-2 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit">
          know before you go
        </span>
        <h1 className="text-4xl capitalize font-semibold text-gray-800">
          traveling opens the door to creating{" "}
          <span className="text-primary">Memories</span>
        </h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam
          ullam explicabo voluptas optio accusantium deserunt eum nulla
          reiciendis magnam necessitatibus qui dolorem, sit odit sint illo
          corrupti modi expedita porro dicta voluptatum? Doloribus aliquid,
          voluptate similique illum iusto provident.
        </p>
      </div>
      <Input />
    </div>
  );
};

export default Landing;
