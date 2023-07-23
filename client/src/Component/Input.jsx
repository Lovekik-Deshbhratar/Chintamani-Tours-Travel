import React from "react";
import { Search, MapPin, Calendar } from "lucide-react";

const Input = () => {
  return (
    <div className=" bg-white py-3 px-5 rounded-lg shadow-sm md:w-[63%]">
      <div className="flex justify-between gap-14">
        <div className="flex flex-col gap-4 flex-grow md:flex-row md:items-center">
          <div className="relative md:w-full">
            <MapPin className="absolute m-2 text-primary/70" />
            <input
              className="outline-none ring-1 ring-primary/40 py-2 pl-10 rounded w-full text-gray-500 focus:placeholder:text-gray-500 placeholder:text-gray-400"
              type="text"
              placeholder="Where would you like to go?"
            />
          </div>
          <div className="relative md:w-full">
            <Calendar className="absolute m-2 text-primary/70" />
            <select className="text-gray-400 focus:text-gray-500 outline-none ring-1 ring-primary/40 py-2 pl-10 rounded w-full">
              <option value="">Select a month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-secondary p-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md hover:rounded-tl-md hover:rounded-br-md hover:rounded-tr-xl hover:rounded-bl-xl transition-all duration-300  hover:bg-primary ease-in-out active:bg-[#fec595]">
            <Search color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
