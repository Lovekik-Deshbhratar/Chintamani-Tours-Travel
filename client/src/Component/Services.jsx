import React from "react";
import Icon from "./Icon";

const services = [
  {
    icon: "Utensils",
    title: "food made by our own staff",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum.",
  },
  {
    icon: "Hotel",
    title: "Hotels AC/Non-Ac",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum.",
  },
  {
    icon: "Compass",
    title: "Best tour guide",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum.",
  },
];

const Services = () => {
  return (
    <div className="py-3 px-5 space-y-5">
      <h1 className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit">
        what we server
      </h1>
      <div className="space-y-7">
        {services.map((item, key) => {
          return (
            <div
              className="bg-white space-y-2 shadow-sm border-b border-r border-primary/40 py-2 px-4 rounded-md"
              key={key}
            >
              <div className="bg-secondary text-white rounded-full w-fit p-2">
                <Icon name={item.icon} color="white" size={27} />
              </div>
              <h1 className="capitalize text-xl text-gray-800 font-semibold tracking-wide">
                {item.title}
              </h1>
              <p className="text-gray-500 text-base leading-7s">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
