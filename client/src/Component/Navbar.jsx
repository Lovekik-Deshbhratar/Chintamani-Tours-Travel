import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";
import { AnimatePresence, motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, scale: 0 },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: { y: 20, opacity: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
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
    navigate("/login");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
      className="py-4 bg-white shadow-md"
    >
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
          {role === "admin" ? (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-xl hover:text-primary"
                  : "text-red-600 font-semibold text-lg hover:text-primary"
              }
              to={"/adminDashboard"}
            >
              Dashboard
            </NavLink>
          ) : null}
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
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="absolute bg-white shadow-md py-4 md:hidden w-full "
            >
              <div className="w-full mt-3">
                <hr />
              </div>
              <motion.div
                variants={itemVariants}
                className="flex gap-5 flex-col items-end py-4 px-10"
              >
                {role === "admin" ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary text-xl hover:text-primary"
                        : "text-red-600 font-semibold text-lg hover:text-primary"
                    }
                    to={"/adminDashboard"}
                  >
                    Dashboard
                  </NavLink>
                ) : null}
                <NavLinks />
              </motion.div>
              <motion.div variants={itemVariants} className="w-full px-10">
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
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
