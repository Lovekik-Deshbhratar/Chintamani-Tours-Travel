import React from "react";
import Input from "../Component/Input";
import Services from "../Component/Services";
import Card from "../Component/Card";
import Gallery from "../Component/Gallery";
import Testimonial from "../Component/Testimonial";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import useFetch from "../Hooks/useFetch";
import { BASE_URL } from "../util/config";
import { motion } from "framer-motion";

const Landing = () => {
  const {
    data: latestTours,
    error,
    loading,
  } = useFetch(`${BASE_URL}/tours/latest/tour`);

  return (
    <>
      <Navbar />
      <div className="px-7 py-4 space-y-7 md:mx-[4%] xl:mx-[10%] mt-9">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="grid grid-cols-1 md:gap-6 lg:grid-cols-2"
        >
          <div className="space-y-6 md:mt-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit md:text-lg"
            >
              know before you go
            </motion.span>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="text-4xl capitalize font-semibold text-gray-800 tracking-wide leading-[2.8rem] md:text-5xl md:leading-[4rem]"
            >
              traveling opens the door to creating{" "}
              <span className="text-primary">Memories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="text-gray-500 text-base leading-7 md:text-lg"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              quibusdam ullam explicabo voluptas optio accusantium deserunt eum
              nulla reiciendis magnam necessitatibus qui dolorem, sit odit sint
              illo corrupti modi expedita porro dicta voluptatum? Doloribus
              aliquid, voluptate similique illum iusto provident.
            </motion.p>
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
        </motion.div>
        <Input />
        <div className="space-y-20 md:space-y-24 py-12 md:py-20">
          <Services />
          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="tracking-wider py-1 px-3 capitalize rounded-full bg-primary/70 text-base font-parisienne w-fit h-fit"
            >
              Explore
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              className="font-semibold text-3xl md:text-4xl capitalize mt-3"
            >
              our upcoming tours
            </motion.h1>
            <div className="mt-14">
              {loading && <h1 className="text-xl">Loading...</h1>}
              {error && <h1 className="text-xl">{error}</h1>}
              {!loading && !error && <Card data={latestTours} />}
            </div>
          </div>
          <Gallery />
          <Testimonial />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
