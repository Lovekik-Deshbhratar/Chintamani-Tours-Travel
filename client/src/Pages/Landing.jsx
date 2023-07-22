import React from "react";
import Input from "../Component/Input";
import Services from "../Component/Services";

const Landing = () => {
  return (
    <div className="px-7 py-4 space-y-7">
      <div className="grid grid-cols-1 gap-6">
        <span className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit">
          know before you go
        </span>
        <h1 className="text-4xl capitalize font-semibold text-gray-800 tracking-wide leading-[2.8rem]">
          traveling opens the door to creating{" "}
          <span className="text-primary">Memories</span>
        </h1>
        <p className="text-gray-500 text-base leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam
          ullam explicabo voluptas optio accusantium deserunt eum nulla
          reiciendis magnam necessitatibus qui dolorem, sit odit sint illo
          corrupti modi expedita porro dicta voluptatum? Doloribus aliquid,
          voluptate similique illum iusto provident.
        </p>
      </div>
      <Input />
      <Services />
    </div>
  );
};

export default Landing;
