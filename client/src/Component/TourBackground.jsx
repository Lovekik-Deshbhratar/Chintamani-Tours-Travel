import React from "react";
import { motion } from "framer-motion";

const TourBackground = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
      className="h-[340px]"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/Asset/background.jpg') no-repeat center center",
      }}
    >
      <div className="h-full flex justify-center items-center">
        <h1 className="text-white text-5xl ">{title}</h1>
      </div>
    </motion.div>
  );
};

export default TourBackground;
