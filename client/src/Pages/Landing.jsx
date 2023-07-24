import React from "react";
import Input from "../Component/Input";
import Services from "../Component/Services";
import Card from "../Component/Card";
import Gallery from "../Component/Gallery";
import Testimonial from "../Component/Testimonial";

const Landing = () => {
  return (
    <div className="px-7 py-4 space-y-7 md:mx-[4%] xl:mx-[10%] ">
      <div className="grid grid-cols-1 md:gap-6 lg:grid-cols-2">
        <div className="space-y-6 md:mt-12">
          <span className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit md:text-lg">
            know before you go
          </span>
          <h1 className="text-4xl capitalize font-semibold text-gray-800 tracking-wide leading-[2.8rem] md:text-5xl md:leading-[4rem]">
            traveling opens the door to creating{" "}
            <span className="text-primary">Memories</span>
          </h1>
          <p className="text-gray-500 text-base leading-7 md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            quibusdam ullam explicabo voluptas optio accusantium deserunt eum
            nulla reiciendis magnam necessitatibus qui dolorem, sit odit sint
            illo corrupti modi expedita porro dicta voluptatum? Doloribus
            aliquid, voluptate similique illum iusto provident.
          </p>
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-7">
          <img
            src="/Asset/img2.jpg"
            alt=""
            className="h-[24rem] object-cover ring-1 ring-primary rounded-3xl"
          />
          <video
            autoPlay
            loop
            muted
            typeof="video/mp4"
            src="/Asset/video.mp4"
            className="mt-[2.2rem] h-[24rem] object-cover ring-1 ring-primary
          rounded-3xl"
          />

          <img
            src="/Asset/img3.jpg"
            alt=""
            className="mt-[4.6rem] h-[24rem] object-cover ring-1 ring-primary rounded-3xl"
          />
        </div>
      </div>
      <Input />
      <Services />
      <Card />
      <Gallery />
      <Testimonial />
    </div>
  );
};

export default Landing;
