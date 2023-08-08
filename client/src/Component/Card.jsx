import React from "react";
import { CalendarCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data.map((item, key) => (
          <div
            className="space-y-2 bg-white rounded-lg overflow-hidden shadow-2xl ring-1 ring-primary/10"
            key={item?._id}
          >
            <div className="object-cover relative">
              <img src={item?.photo} alt="" />
              <button className="absolute right-0 bottom-0 bg-secondary p-2 h-fit text-white text-xs mb-1 font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[1.1]">
                Download Quote
              </button>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">
                  <MapPin className="text-primary/70 inline" /> {item?.location}
                </span>
                <span className="text-gray-500 font-semibold">
                  <CalendarCheck className="text-primary/70 inline" />{" "}
                  {new Date(item?.date).toLocaleDateString("en-US", options)}
                </span>
              </div>
              <div>
                <Link
                  to={`/tours/${item?._id}`}
                  className="text-gray-800 text-xl font-semibold hover:text-secondary cursor-pointer"
                >
                  {item?.title}
                </Link>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span>
                    <span className="text-secondary font-bold">
                      Rs. {item?.price}
                    </span>{" "}
                    <span className="text-gray-600 font-semibold text-sm">
                      /per person
                    </span>
                  </span>
                </div>
                <button className="bg-secondary p-2 text-white text-sm rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]">
                  <Link to={`/tours/${item?._id}`}>Book Now</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
