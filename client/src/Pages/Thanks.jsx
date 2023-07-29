import { Check } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Thanks = () => {
  return (
    <>
      <Navbar />
      <div className="px-7 py-4 space-y-7 md:mx-[4%] xl:mx-[10%] h-[47.5vh]">
        <div className="flex justify-center items-center h-full">
          <div className="w-fit flex flex-col gap-6  text-center">
            <div className="flex justify-center">
              <Check size={40} className="bg-secondary rounded-full p-1.5" />
            </div>
            <h1 className="font-parisienne text-5xl tracking-widest">
              Thank You
            </h1>
            <h1 className="text-4xl capitalize">your tour is booked!</h1>
            <button className="capitalize bg-secondary p-2 text-white w-full rounded-3xl font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]">
              <Link to={"/"}>Back to home</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Thanks;
