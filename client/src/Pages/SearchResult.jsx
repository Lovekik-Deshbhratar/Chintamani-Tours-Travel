import React, { useState } from "react";
import TourBackground from "../Component/TourBackground";
import Card from "../Component/Card";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SearchResult = () => {
  const location = useLocation();
  const [data] = useState(location.state);
  console.log(data);

  return (
    <>
      <Navbar />
      <div className="">
        <TourBackground title={"Tour Search Result"} />
        <div className="px-7 py-12 mb-24 space-y-16  md:mx-[4%] xl:mx-[10%]">
          {data.length == 0 ? (
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="text-3xl text-center font-semibold"
            >
              No tour found
            </motion.h1>
          ) : (
            <Card data={data} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
