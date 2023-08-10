import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";

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
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { notificationHandler } = useContext(NotificationContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    notificationHandler({
      type: "success",
      message: "Logout successfull",
    });
    navigate("/");
  };
  return (
    <div className="py-4 bg-white shadow-md">
      <div className="md:flex md:justify-between md:max-lg:items-center md:mx-[2rem] lg:mx-[8rem] xl:mx-[15rem] md:space-y-4">
        <div className="flex justify-between px-4 md:p-0">
          <NavLink to={"/"}>
            <img
              className="w-[9rem] lg:w-24 "
              src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
              alt=""
            />
          </NavLink>
          <div className="flex items-center gap-6 md:hidden">
            {user ? (
              <h1 className="text-xl font-semibold">Hi, {user.username}</h1>
            ) : (
              <button className="bg-secondary py-2 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9] ">
                <Link to={"/signup"}>Sign up</Link>
              </button>
            )}
            {isOpen ? (
              <X onClick={handleToggle} size={35} />
            ) : (
              <Menu onClick={handleToggle} size={35} />
            )}
          </div>
        </div>
        <div className="hidden md:flex gap-7 md:flex-row flex-col ">
          <NavLinks />
          {user ? (
            <h1 className="text-xl font-semibold">Hi, {user.username}</h1>
          ) : (
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
          )}
          <div className="-mt-1.5">
            {user ? (
              <button
                className="bg-black py-2 px-3 text-white rounded-lg font-semibold hover:bg-gray-900 transition-all ease-in-out duration-300 active:bg-black  active:scale-[0.9]"
                onClick={Logout}
              >
                Logout
              </button>
            ) : (
              <button className="bg-secondary py-2 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9] ">
                <Link to={"/signup"}>Sign up</Link>
              </button>
            )}
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
                {user ? (
                  <button className="text-gray-500 text-lg" onClick={Logout}>
                    Logout
                  </button>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
