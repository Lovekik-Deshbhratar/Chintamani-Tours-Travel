import React, { useContext, useState } from "react";
import { IndianRupee } from "lucide-react";
import { BASE_URL } from "../util/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";
import { motion } from "framer-motion";

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "This is a required field";
  } else if (values.fullName.length < 10) {
    errors.fullName = "Must be 15 characters or more";
  }

  if (!values.phone) {
    errors.phone = "This is a required field";
  } else if (values.phone.length !== 10) {
    errors.phone = "Must be exactly 10 digits";
  }

  if (!values.bookAt) {
    errors.bookAt = "This is a required field";
  } else {
    const currentDate = new Date();
    const selectedDate = new Date(values.bookAt);
    if (selectedDate <= currentDate) {
      errors.bookAt = "Please select a date greater than the current date";
    }
  }

  return errors;
};

const Booking = ({ tour, tourId }) => {
  const { price, title } = tour;
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    bookAt: "",
    peopleSize: "",
  });
  const { notificationHandler } = useContext(NotificationContext);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevbooking) => ({
      ...prevbooking,
      [name]: value,
    }));
    setError(validate({ ...booking, [name]: value }));
  };

  const amountXprice =
    price * (booking?.peopleSize === "" ? 1 : booking?.peopleSize);

  const serviceCharges = 100;
  const total =
    price * (booking?.peopleSize === "" ? 1 : booking?.peopleSize) +
    serviceCharges;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null)
        return notificationHandler({
          type: "error",
          message: "Please Sign In",
        });

      if (role === "admin")
        return notificationHandler({
          type: "error",
          message: "You are not allowed",
        });

      if (
        booking.fullName != "" ||
        booking.phone != "" ||
        booking.bookAt != ""
      ) {
        const requestObj = { ...booking, total, serviceCharges, amountXprice };
        const res = await fetch(`${BASE_URL}/booking`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestObj),
        });

        const result = await res.json();

        if (!res.ok)
          return notificationHandler({
            type: "error",
            message: result.message,
          });
        navigate("/thanks");
      }
    } catch (error) {
      notificationHandler({
        type: "success",
        message: error.message,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
      viewport={{ once: true }}
      className="rounded-md border px-5 py-7 md:px-7 md:py-8 space-y-6 md:space-y-8 bg-white lg:w-[42%] xl:w-[30%] h-fit sticky top-0"
    >
      <div>
        <span className="flex items-center gap-1">
          <IndianRupee className="inline" size={22} />
          <div>
            <span className="text-2xl md:text-3xl font-semibold"> {price}</span>{" "}
            <span className="text-gray-600">/per person</span>
          </div>
        </span>
      </div>
      <hr />
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold">Infornation</h1>
        <motion.div
          layout
          className="grid grid-cols-2 border px-3 pt-3 pb-6 gap-4"
        >
          <div className="col-span-2">
            <input
              name="fullName"
              value={booking.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Full Name *"
              className="border-b w-full outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
            />
            {error?.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm mt-1 mb-2 text-gray-500"
              >
                {error.fullName}
              </motion.p>
            )}
          </div>

          <div className="col-span-2">
            <input
              name="phone"
              value={booking.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone *"
              className=" border-b w-full outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
            />
            {error?.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm mt-1 mb-2 text-gray-500"
              >
                {error.phone}
              </motion.p>
            )}
          </div>
          <div>
            <input
              name="bookAt"
              value={booking.bookAt}
              onChange={handleChange}
              type="date"
              className="border-b outline-none h-11 px-3 focus:border-black caret-secondary  text-gray-600 bg-primary/[0]"
            />
            {error?.bookAt && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm mt-1 mb-2 text-gray-500"
              >
                {error.bookAt}
              </motion.p>
            )}
          </div>
          <input
            name="peopleSize"
            value={booking.peopleSize}
            onChange={handleChange}
            type="number"
            placeholder="No. of People"
            className="border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
          />
        </motion.div>
        <div className="space-y-5 md:space-y-6">
          <div className="flex justify-between md:text-lg text-gray-700">
            <span className="flex items-center gap-1">
              <IndianRupee className="inline" size={18} /> {price} x{" "}
              {booking?.peopleSize === "" ? 1 : booking?.peopleSize} person
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee className="inline" size={18} />{" "}
              {price * (booking?.peopleSize === "" ? 1 : booking?.peopleSize)}
            </span>
          </div>
          <div className="flex justify-between md:text-lg text-gray-700">
            <span>Service charges</span>
            <span className="flex items-center gap-1">
              <IndianRupee className="inline" size={18} /> {100}
            </span>
          </div>
          <div className="flex justify-between text-xl md:text-2xl font-semibold">
            <span>Total</span>
            <span className="flex items-center gap-1">
              <IndianRupee className="inline" size={22} />{" "}
              {price * (booking?.peopleSize === "" ? 1 : booking?.peopleSize) +
                100}
            </span>
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-secondary w-full p-2 text-white rounded-full font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.98] mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={Object.keys(error).length > 0}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default Booking;
