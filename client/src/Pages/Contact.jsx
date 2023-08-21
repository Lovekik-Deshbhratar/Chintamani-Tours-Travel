import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { motion } from "framer-motion";

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "This is a required field";
  } else if (values.fullName.length < 15) {
    errors.fullName = "Must be 15 characters or more";
  }

  if (!values.phone) {
    errors.phone = "This is a required field";
  } else if (values.phone.length !== 10) {
    errors.phone = "Must be exactly 10 digits";
  }

  if (!values.email) {
    errors.email = "This is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (!values.message) {
    errors.message = "This is a required field";
  } else if (values.message.length < 15) {
    errors.message = "Must be 15 characters or more";
  }

  return errors;
};

const Contact = () => {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError(validate({ ...data, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center my-10">
        <h1 className="text-4xl text-gray-800">Contact Us</h1>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="capitalize text-gray-700"
        >
          Contact us if u have any query
        </motion.span>
        <div className="lg:w-[40rem] flex flex-col gap-5 mt-14 w-full px-6 md:px-36 lg:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            <h1>Full Name *</h1>
            <input
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              placeholder="name"
            />
            {error?.fullName && (
              <p className="text-sm mt-1 mb-2 text-red-500">{error.fullName}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            <h1>Phone *</h1>
            <input
              name="phone"
              value={data.phone}
              onChange={handleChange}
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75 "
              placeholder="mobile number"
            />
            {error?.phone && (
              <p className="text-sm mt-1 mb-2 text-red-500">{error.phone}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            <h1>Email address *</h1>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="text"
              required
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 placeholder:text-gray-400 placeholder:text-base placeholder:font-thin focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              placeholder="name@example.com"
            />
            {error?.email && (
              <p className="text-sm mt-1 mb-2 text-red-500">{error.email}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            <h1>Message</h1>
            <textarea
              name="message"
              value={data.message}
              onChange={handleChange}
              placeholder="Query *"
              className="border mt-2 outline-none rounded-[0.19rem] w-full px-3 py-1.5 text-gray-800 resize-none focus:border-4 focus:border-secondary/40 focus:border-opacity-50 transition-all duration-75"
              rows={4}
            ></textarea>
            {error?.message && (
              <p className="text-sm mt-1 mb-2 text-red-500">{error.message}</p>
            )}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
            disabled={Object.keys(error).length > 0}
            className="mt-7 h-fit w-fit border border-secondary text-sm px-3 py-1.5 text-primary rounded-[0.2rem] hover:bg-secondary hover:text-white transition ease-in-out duration-500 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-white"
          >
            Submit Form
          </motion.button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
