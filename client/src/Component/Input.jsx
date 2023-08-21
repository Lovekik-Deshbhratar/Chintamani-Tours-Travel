import React, { useContext, useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { BASE_URL } from "../Util/config";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../Context/NotificationContext";
import { motion } from "framer-motion";

const Input = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    date: "",
  });
  const navigate = useNavigate();
  const { notificationHandler } = useContext(NotificationContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevbooking) => ({
      ...prevbooking,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    if (searchData.location === "" || searchData.date === "") {
      return notificationHandler({
        type: "warning",
        message: "Fields are required",
      });
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getByTour?location=${searchData.location}&date=${searchData.date}`
    );

    if (!res.ok) {
      return notificationHandler({
        type: "error",
        message: "Something went wrong",
      });
    }

    const result = await res.json();

    navigate(
      `/tours/search?location=${searchData.location}&date=${searchData.date}`,
      {
        state: result.data,
      }
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
      className=" bg-white py-3 mt-6 px-2 md:px-5 rounded-lg shadow-lg xl:w-[63%]"
    >
      <div className="flex justify-between gap-3 md:gap-12 lg:gap-14">
        <div className="flex flex-col gap-4 flex-grow md:flex-row md:items-center">
          <div className="relative md:w-full">
            <MapPin className="absolute ml-0.5 my-2 md:m-2 text-primary/70" />
            <input
              className="caret-secondary outline-none ring-1 ring-primary/40 py-2 pl-7 md:pl-10 rounded w-full text-gray-500 focus:placeholder:text-gray-500 placeholder:text-gray-400"
              type="text"
              name="location"
              placeholder="Where would you like to go?"
              value={searchData.location}
              onChange={handleChange}
            />
          </div>
          <div className="relative md:w-full">
            <Calendar className="absolute ml-0.5 my-2 md:m-2 text-primary/70" />
            <input
              className="caret-secondary outline-none ring-1 ring-primary/40 py-2 pl-7 md:pl-10 rounded w-full text-gray-500 focus:placeholder:text-gray-500 placeholder:text-gray-400"
              type="date"
              name="date"
              value={searchData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleSearch}
            className="bg-secondary p-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md hover:rounded-tl-md hover:rounded-br-md hover:rounded-tr-xl hover:rounded-bl-xl transition-all duration-300  hover:bg-primary ease-in-out active:bg-[#fec595] active:scale-[0.9]"
          >
            <Search color="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Input;
