import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="xl:px-44 lg:px-20 lg:h-[80vh] flex flex-col lg:flex-row md:items-center md:justify-between px-4 gap-10 lg:gap-0 mt-6 lg:mt-0">
        <div className="flex flex-col lg:w-fit gap-7">
          <h1 className="text-3xl lg:text-4xl text-black tracking-wide font-[600] lg:w-[35rem] leading-tight">
            Welcome to About page of{" "}
            <span className="text-primary capitalize">
              Chintamani tours & travel
            </span>
          </h1>
          <h1 className="text-gray-700 text-xl">
            We are team of talanted developer making websites
          </h1>
          <Link
            to={"/contact"}
            className="border-2 border-secondary text-primary rounded-3xl px-8 py-2.5 w-fit hover:text-white hover:bg-secondary transition ease-in-out duration-500 tracking-wider text-sm"
          >
            Contact Here
          </Link>
        </div>
        <div>
          <img src="/Asset/aboutImage.svg" className="animate-up-down" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
