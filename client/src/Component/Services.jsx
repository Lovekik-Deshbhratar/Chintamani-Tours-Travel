import React from "react";
import Icon from "./Icon";
import { motion } from "framer-motion";

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
    <div className="py-3 space-y-5">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
        className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit"
      >
        what we serve
      </motion.h1>
      <div className="md:flex md:flex-col lg::flex lg:flex-row xl:space-x-17 space-y-6 lg:space-y-0">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="md:flex font-semibold text-3xl md:text-4xl capitalize "
        >
          we offer our best services
        </motion.span>
        <div className="space-y-7 grid grid-cols-1 md:grid-cols-3 md:space-y-0 md:gap-3 xl:gap-6 md:w-fit">
          {services.map((item, key) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
