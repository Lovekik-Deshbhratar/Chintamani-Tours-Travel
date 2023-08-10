import React, { useEffect, useState } from "react";
import TourBackground from "../Component/TourBackground";
import Input from "../Component/Input";
import Card from "../Component/Card";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import useFetch from "../Hooks/useFetch";
import { BASE_URL } from "../Util/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <Navbar />
      <div className="">
        <TourBackground title={"All Tours"} />
        <div className="px-7 py-12 space-y-16  md:mx-[4%] xl:mx-[10%]">
          <Input />
          {loading && <h1 className="text-xl">Loading...</h1>}
          {error && <h1 className="text-xl">{error}</h1>}
          {!loading && !error && (
            <>
              <Card data={tours} />
              <div className="flex justify-center">
                <div className="flex gap-5  font-semibold">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      onClick={() => setPage(number)}
                      key={number}
                      className={
                        page === number
                          ? "bg-secondary ring-1 ring-secondary text-white w-8 h-8 flex justify-center items-center rounded-full"
                          : "w-8 h-8 flex justify-center ring-1 ring-secondary items-center rounded-full cursor-pointer"
                      }
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tours;
