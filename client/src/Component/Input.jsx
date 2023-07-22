import React from "react";
import { Search, MapPin } from "lucide-react";

const Input = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="border">
          <input
            className="relative outline-none ring-1 ring-gray-400 p-1 w-full"
            type="text"
            placeholder="Where would you like to go?"
          />
          <MapPin className="absolute" />
        </div>
        <select className="outline-none">
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
      <div className="flex justify-center">
        <button className="bg-primary p-2">
          <Search color="white" size={25} />
        </button>
      </div>
    </div>
  );
};

export default Input;
