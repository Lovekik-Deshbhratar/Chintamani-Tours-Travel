import { MapPin, Mail, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-7 py-8 md:px-[4%] xl:px-[10%] space-y-8 bg-white shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-4 space-y-8 lg:space-y-0">
        <div className="md:max-lg:flex md:max-lg:justify-center">
          <img
            className="w-[10rem]"
            src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
            alt=""
          />
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">Discover</h1>
          <div className="flex flex-col text-xl text-gray-600 gap-3">
            <Link className="w-fit h-fit" to={"/"}>
              Home
            </Link>
            <Link className="w-fit h-fit" to={"/tours"}>
              Tours
            </Link>
            <Link className="w-fit h-fit" to={"/about"}>
              About
            </Link>
            <Link className="w-fit h-fit" to={"contact"}>
              Contact
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">Quick Links</h1>
          <div className="flex flex-col text-xl text-gray-600 gap-3">
            <Link className="w-fit h-fit" to={""}>
              Gallery
            </Link>
            <Link className="w-fit h-fit" to={""}>
              Login
            </Link>
            <Link className="w-fit h-fit" to={""}>
              Register
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">Contact</h1>
          <div className="flex flex-col text-xl text-gray-600 gap-3">
            <h1>
              <MapPin className="text-primary/70 inline mb-1" size={19} />{" "}
              <span className="font-semibold text-gray-700">Address:</span>{" "}
              Jeswani Complex, Darwha Road, Yavatmal Ho, Yavatmal - 445001
            </h1>
            <h1>
              <Mail className="text-primary/70 inline mb-1" size={19} />{" "}
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              abcdefgcyz@gmail.com
            </h1>
            <h1>
              <Phone className="text-primary/70 inline mb-1" size={19} />{" "}
              <span className="font-semibold text-gray-700">Phone:</span>{" "}
              <div className="flex flex-col gap-2 mt-2">
                <span>(+91) 01234567890</span>
                <span>(+91) 01234567890</span>
                <span>(+91) 01234567890</span>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div className="md:flex md:justify-center">
        <h1 className="text-gray-600 font-serif">
          Copyright ©2023 All rights reserved by{" "}
          <span className="text-primary">Chintamani Tours & Travels</span>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
