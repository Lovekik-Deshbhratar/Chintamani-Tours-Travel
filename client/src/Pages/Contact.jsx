import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center my-10">
        <h1 className="text-4xl text-gray-800">Contact Us</h1>
        <span className="capitalize text-gray-700">
          Contact us if u have any query
        </span>
        <div className="lg:w-[40rem] flex flex-col gap-5 mt-14 w-full px-6 md:px-36 lg:px-0">
          <div>
            <h1>Full Name</h1>
            <input
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              placeholder="name"
            />
          </div>
          <div>
            <h1>Phone</h1>
            <input
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75 "
              placeholder="mobile number"
            />
          </div>
          <div>
            <h1>Email address</h1>
            <input
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              placeholder="name@example.com"
            />
          </div>{" "}
          <div>
            <h1>Message</h1>
            <textarea
              placeholder="Optional"
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 resize-none focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              rows={4}
            ></textarea>
          </div>
          <button className="mt-7 h-fit w-fit border border-secondary text-sm px-3 py-1.5 text-primary rounded-[0.2rem] hover:bg-secondary hover:text-white transition ease-in-out duration-500 ">
            Submit Form
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
