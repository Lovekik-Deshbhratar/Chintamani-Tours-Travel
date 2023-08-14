import React, { useContext, useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { BASE_URL } from "../Util/config";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../Context/NotificationContext";

const Input = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { notificationHandler } = useContext(NotificationContext);

  const handleSearch = async () => {
    if (location == "")
      return notificationHandler({
        type: "error",
        message: "Field are required",
      });

    const res = await fetch(
      `${BASE_URL}/tours/search/getByTour?location=${location}`
    );

    if (!res.ok)
      return notificationHandler({
        type: "error",
        message: "Something went wrong",
      });

    const result = await res.json();

    navigate(`/tours/search?location=${location}`, { state: result.data });
  };
  return (
    <div className=" bg-white py-3 mt-6 px-2 md:px-5 rounded-lg shadow-lg xl:w-[63%]">
      <div className="flex justify-between gap-3 md:gap-12 lg:gap-14">
        <div className="flex flex-col gap-4 flex-grow md:flex-row md:items-center">
          <div className="relative md:w-full">
            <MapPin className="absolute ml-0.5 my-2 md:m-2 text-primary/70" />
            <input
              className="caret-secondary outline-none ring-1 ring-primary/40 py-2 pl-7 md:pl-10 rounded w-full text-gray-500 focus:placeholder:text-gray-500 placeholder:text-gray-400"
              type="text"
              placeholder="Where would you like to go?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="relative md:w-full">
            <Calendar className="absolute ml-0.5 my-2 md:m-2 text-primary/70" />
            <select className="text-gray-400 focus:text-gray-500 outline-none ring-1 ring-primary/40 py-2 pl-7 md:pl-10  rounded w-full">
              <option value="" hidden>
                Select a month
              </option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
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
    </div>
  );
};

export default Input;
