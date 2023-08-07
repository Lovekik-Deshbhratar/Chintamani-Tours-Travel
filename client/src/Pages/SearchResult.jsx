import React, { useState } from "react";
import TourBackground from "../Component/TourBackground";
import Card from "../Component/Card";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useLocation } from "react-router-dom";

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
            <h1 className="text-3xl text-center font-semibold">
              No tour found
            </h1>
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
