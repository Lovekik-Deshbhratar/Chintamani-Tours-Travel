import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const feedback = [
  {
    user: "Mr. johan smit",
    message:
      "vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque",
  },
  {
    user: "Mr. johan smit",
    message:
      "vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque",
  },
  {
    user: "Mr. johan smit",
    message:
      "vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque",
  },
  {
    user: "Mr. johan smit",
    message:
      "vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque",
  },
  {
    user: "Mr. johan smit",
    message:
      "vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque",
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2700,
    swipeToSlide: true,
    autoplaySpeed: 6000,
    initialSlide: 0,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-3">
      <h1 className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit">
        Testimonialss
      </h1>
      <h1 className="font-semibold text-3xl md:text-4xl capitalize mt-3">
        what our customer saying about us
      </h1>
      <Slider {...settings} className="mt-10">
        {feedback.map((item, key) => (
          <div className="text-gray-800 p-6 md:p-8 space-y-6 " key={key}>
            <img
              src="/Asset/left.png"
              alt=""
              className="float-left pr-2 w-10"
            />
            <p className="first-letter:text-3xl first-letter:font-semibold first-letter:text-secondary">
              {item.message}
            </p>
            <div className="flex justify-end">
              <h1 className="capitalize text-gray-600">{item.user}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
