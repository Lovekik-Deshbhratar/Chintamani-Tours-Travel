import React, { useContext, useState } from "react";
import { IndianRupee } from "lucide-react";
import { BASE_URL } from "../Util/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";

const Booking = ({ tour }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevbooking) => ({
      ...prevbooking,
      [name]: value,
    }));
  };

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

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result.message,
        });
      navigate("/thanks");
    } catch (error) {
      notificationHandler({
        type: "success",
        message: error.message,
      });
    }
  };
  return (
    <div className="rounded-md border px-5 py-7 md:px-7 md:py-8 space-y-6 md:space-y-8 bg-white lg:w-[42%] xl:w-[30%] h-fit sticky top-0">
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
        <div className="grid grid-cols-2 border px-3 pt-3 pb-6 gap-4">
          <input
            name="fullName"
            value={booking.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
          />
          <input
            name="phone"
            value={booking.phone}
            onChange={handleChange}
            type="text"
            placeholder="Phone"
            className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
          />
          <input
            name="bookAt"
            value={booking.bookAt}
            onChange={handleChange}
            type="date"
            className="border-b outline-none h-11 px-3 focus:border-black caret-secondary  text-gray-600 bg-primary/[0]"
          />
          <input
            name="peopleSize"
            value={booking.peopleSize}
            onChange={handleChange}
            type="number"
            placeholder="No. of People"
            className="border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
          />
        </div>
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
          className="bg-secondary w-full p-2 text-white rounded-full font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.98] mt-2"
          onClick={handleSubmit}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
