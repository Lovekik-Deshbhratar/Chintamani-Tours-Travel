import React from "react";
import { CalendarCheck, MapPin } from "lucide-react";

const card = [
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
  {
    img: "/Asset/img1.jpg",
    location: "Nepal",
    date: "Oct 25 2023",
    title: "Nepal Darshan",
  },
];

const Card = () => {
  return (
    <div className="py-3">
      <h1 className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit">
        Explore
      </h1>
      <h1 className="font-semibold text-3xl md:text-4xl capitalize mt-3">
        our upcoming tours
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {card.map((item, key) => (
          <div
            className="space-y-2 bg-white rounded-lg overflow-hidden shadow-2xl ring-1 ring-primary/10"
            key={key}
          >
            <div className="object-cover">
              <img src={item.img} alt="" />
            </div>
            <div className="space-y-5 p-5">
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">
                  <MapPin className="text-primary/70 inline" /> {item.location}
                </span>
                <span className="text-gray-500 font-semibold">
                  <CalendarCheck className="text-primary/70 inline" />{" "}
                  {item.date}
                </span>
              </div>
              <h1 className="text-gray-800 text-xl font-semibold">
                {item.title}
              </h1>
              <div className="flex justify-end">
                <button className="bg-secondary p-3 text-white text-sm rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]">
                  Download Quote
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
