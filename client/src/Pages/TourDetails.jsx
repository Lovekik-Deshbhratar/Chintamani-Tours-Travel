import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import tours from "../Component/tours";
import { IndianRupee, MapPin } from "lucide-react";

const TourDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((item) => item.id == id);

  const handleSubmit = () => {
    navigate("/thanks");
  };
  return (
    <div className="px-7 py-4 space-y-6 lg:space-y-0 md:mx-[4%] xl:mx-[10%] mt-9 lg:flex lg:gap-6">
      <div className="space-y-6 lg:w-[65%] xl::w-[68%] ">
        <div>
          <img src={tour.img} alt="" className="rounded-md mb-11" />
        </div>
        <div className="rounded-md border px-5 py-7 md:px-7 space-y-5 bg-white ">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold">{tour.title}</h1>
            <span className="flex gap-2">
              <MapPin className="p-1" /> {tour.location}
            </span>
            <span className="flex gap-2">
              <IndianRupee className="p-1" />
              <span>{tour.price} /per person</span>
            </span>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-xl md:text-2xl font-semibold">Description</h1>
            <p className="text-gray-600">{tour.description}</p>
          </div>
        </div>
        <div className="space-y-8 rounded-md border px-5 py-7 md:px-7 md:py-8 bg-white">
          <h1 className="text-2xl md:text-3xl font-semibold">Reviews</h1>
          <div className="relative">
            <button className="absolute right-0 mt-1  mr-1 bottom- bg-secondary py-1 px-3  text-white rounded-full font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]">
              Submit
            </button>
            <input
              type="text"
              placeholder="Share your thoughts..."
              className="w-full bg-primary/[0] ring-1 ring-secondary py-2 px-3 rounded-full caret-secondary outline-none"
            />
          </div>
          <div className="px-1 space-y-6">
            <div className=" flex gap-4">
              <img
                src="/Asset/avatar.jpg"
                alt=""
                className="w-16 h-16 mix-blend-multiply "
              />
              <div className="">
                <h1 className="font-semibold text-lg">Johan Doe</h1>
                <h1 className="text-gray-500">July 27,2023</h1>
                <p className="mt-4 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi, ea!
                </p>
              </div>
            </div>
            <div className=" flex gap-4">
              <img
                src="/Asset/avatar.jpg"
                alt=""
                className="w-16 h-16 mix-blend-multiply "
              />
              <div className="">
                <h1 className="font-semibold text-lg">Johan Doe</h1>
                <h1 className="text-gray-500">July 27,2023</h1>
                <p className="mt-4 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi, ea!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border px-5 py-7 md:px-7 md:py-8 space-y-6 md:space-y-8 bg-white lg:w-[42%] xl:w-[30%] h-fit sticky top-0">
        <div>
          <span className="flex items-center gap-1">
            <IndianRupee className="inline" size={22} />
            <div>
              <span className="text-2xl md:text-3xl font-semibold">
                {" "}
                {tour.price}
              </span>{" "}
              <span className="text-gray-600">/per person</span>
            </div>
          </span>
        </div>
        <hr />
        <div className="space-y-6">
          <h1 className="text-xl md:text-2xl font-semibold">Infornation</h1>
          <div className="grid grid-cols-2 border px-3 pt-3 pb-6 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
            />
            <input
              type="text"
              placeholder="Phone"
              className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
            />
            <input
              type="date"
              className="border-b outline-none h-11 px-3 focus:border-black caret-secondary  text-gray-600 bg-primary/[0]"
            />
            <input
              type="number"
              placeholder="No. of People"
              className="border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
            />
          </div>
          <div className="space-y-5 md:space-y-6">
            <div className="flex justify-between md:text-lg text-gray-700">
              <span className="flex items-center gap-1">
                <IndianRupee className="inline" size={18} /> {tour.price} x {1}{" "}
                person
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="inline" size={18} /> {tour.price * 1}
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
                {tour.price * 1 + 100}
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
    </div>
  );
};

export default TourDetails;
