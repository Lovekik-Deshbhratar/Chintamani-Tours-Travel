import React from "react";
import { motion } from "framer-motion";

const photos = [
  {
    img: "https://source.unsplash.com/ztpUS4N1xhY",
  },
  {
    img: "https://source.unsplash.com/mPFSPqZOO7s",
  },
  {
    img: "https://source.unsplash.com/uPEnxrdSKIw",
  },
  {
    img: "https://source.unsplash.com/hFKZ5-OT9Ys",
  },
  {
    img: "https://source.unsplash.com/Vc2dD4l57og",
  },
  {
    img: "https://source.unsplash.com/hqnQWmIt3cY",
  },
  {
    img: "https://source.unsplash.com/NTGg2rtWDwg",
  },
  {
    img: "https://source.unsplash.com/mpwF3Mv2UaU   ",
  },
];

const Gallery = () => {
  return (
    <div className="py-3">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
        className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit"
      >
        Gallery
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
        className="font-semibold text-3xl md:text-4xl capitalize mt-3"
      >
        Visit our customers tour gallery
      </motion.h1>
      <div className="p-5 md:p-10">
        <div className="columns-1 gap-5 lg:gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
          {photos.map((item, key) => (
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              key={key}
              className="rounded-xl transition-transform duration-[0.3s] hover:scale-110"
              src={item.img}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
