import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
      <div className="md:flex md:justify-between md:mx-[4rem] lg:mx-[11rem] xl:mx-[15rem] md:space-y-4">
        <div className="flex justify-between px-4 md:p-0">
          <NavLink to={"/"}>
            <img
              className="w-[9rem] lg:w-24 "
              src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
              alt=""
            />
          </NavLink>
          <div className="flex items-center gap-6 md:hidden">
            <button className="bg-secondary py-2 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9] ">
              <Link to={"/signup"}>Sign up</Link>
            </button>
            {isOpen ? (
              <X onClick={handleToggle} size={35} />
            ) : (
              <Menu onClick={handleToggle} size={35} />
            )}
          </div>
        </div>
        <div className="hidden md:flex gap-7 md:flex-row flex-col ">
          <NavLinks />
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-primary text-xl hover:text-primary"
                : "text-gray-500 text-lg hover:text-primary"
            }
            to={"/login"}
          >
            Login
          </NavLink>
          <div className="-mt-1.5">
            <button className="bg-secondary py-2 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9] ">
              <Link to={"/signup"}>Sign up</Link>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute bg-white shadow-md py-4  md:hidden  w-full">
            <div className="w-full mt-3">
              <hr />
            </div>
            <div className="flex gap-5 flex-col items-end py-4 px-10">
              <NavLinks />
            </div>
            <div className="w-full px-10">
              <hr />
              <div className="flex flex-col items-end mt-4">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-xl hover:text-primary"
                      : "text-gray-500 text-lg hover:text-primary"
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
