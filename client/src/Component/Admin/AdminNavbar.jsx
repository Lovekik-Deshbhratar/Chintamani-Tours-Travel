import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { ChevronRight } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { NotificationContext } from "../../Context/NotificationContext";

const AdminNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const { user, dispatch, role } = useContext(AuthContext);
  const { notificationHandler } = useContext(NotificationContext);
  const navigate = useNavigate();

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    notificationHandler({
      type: "success",
      message: "Logout successfull",
    });
    navigate("/");
  };
  return (
    <div className="relative md:px-[2%] bg-white md:hidden">
      {isVisible && (
        <div className="h-screen bg-white w-[60vw] absolute right-0 text-end shadow-2xl">
          <div className="py-4 mr-3">
            <button onClick={() => setIsVisible(!isVisible)}>
              <X />
            </button>
          </div>
          <hr />
          <div className="flex flex-col py-4 px-3 gap-3">
            <NavLink to={"/adminDashboard"}>Dashboard</NavLink>
            <NavLink className="flex justify-end">
              <button
                className="flex gap-2"
                onClick={() => setIsSubMenu(!isSubMenu)}
              >
                <span>Tours</span>
                <span className={isSubMenu ? "rotate-90" : "rotate-0"}>
                  <Icon name={"ChevronRight"} />
                </span>
              </button>
            </NavLink>
            {isSubMenu && (
              <div className="flex flex-col  space-y-2 -mt-0.5">
                <NavLink to={"/adminAllTour"}>All Tours</NavLink>
                <NavLink to={"/adminAddTour"}>Add Tour</NavLink>
              </div>
            )}
            <span onClick={Logout}>Logout</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-3">
        <img
          className="w-[5rem] lg:w-24"
          src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
          alt=""
        />
        <div className="flex gap-4">
          <button
            onClick={Logout}
            className="bg-secondary p-2 text-white text-sm rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]"
          >
            Logout
          </button>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsVisible(!isVisible)}>
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
