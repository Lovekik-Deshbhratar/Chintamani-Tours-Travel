import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavLinks = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary text-xl hover:text-primary"
            : "text-gray-500 text-lg hover:text-primary"
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary text-xl hover:text-primary"
            : "text-gray-500 text-lg hover:text-primary"
        }
        to={"/tours"}
      >
        Tours
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary text-xl hover:text-primary"
            : "text-gray-500 text-lg hover:text-primary"
        }
        to={"/about"}
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary text-xl hover:text-primary"
            : "text-gray-500 text-lg hover:text-primary"
        }
        to={"/contact"}
      >
        Contact
      </NavLink>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="py-4 bg-white shadow-md">
      <div className="md:flex md:justify-between md:mx-[7rem] lg:mx-[15rem] space-y-4">
        <div className="flex justify-between px-4 md:p-0">
          <NavLink to={"/"}>
            <img
              className="w-[9rem] lg:w-24 "
              src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
              alt=""
            />
          </NavLink>
          <div className="flex items-center">
            {isOpen ? (
              <X onClick={handleToggle} className="md:hidden" size={35} />
            ) : (
              <Menu onClick={handleToggle} className="md:hidden" size={35} />
            )}
          </div>
        </div>
        <div className="hidden md:flex gap-6 md:flex-row flex-col">
          <NavLinks />
        </div>
        {isOpen && (
          <div className="flex gap-5 absolute bg-white shadow-md md:flex-row flex-col md:hidden items-center w-full">
            <NavLinks />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
