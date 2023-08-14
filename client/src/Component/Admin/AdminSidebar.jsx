import React, { useContext } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Icon from "../Icon";
import { AuthContext } from "../../Context/AuthContext";
import { NotificationContext } from "../../Context/NotificationContext";

const AdminSidebar = () => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
  const { notificationHandler } = useContext(NotificationContext);

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    notificationHandler({
      type: "success",
      message: "Logout successfull",
    });
    navigate("/");
  };

  return (
    <div className="border-r md:w-[22%] lg:w-[18%] xl:w-[15%] hidden md:inline-block relative">
      <div className="flex justify-center py-7">
        <img
          className="w-[5rem]"
          src="https://www.chintamanitours.com/static/img/logo/chintamani.png"
          alt=""
        />
      </div>
      <div className="mt-8 pl-6 flex flex-col gap-6">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary text-lg hover:text-primary"
              : "hover:text-primary"
          }
          to={"/adminDashboard"}
        >
          Dashboard
        </NavLink>
        <span>
          <button
            className="flex gap-2"
            onClick={() => setIsSubMenu(!isSubMenu)}
          >
            <span>Tours</span>
            <span className={isSubMenu ? "rotate-90" : "rotate-0"}>
              <Icon name={"ChevronRight"} />
            </span>
          </button>
        </span>
        {isSubMenu && (
          <div className="flex flex-col -mt-4 gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg hover:text-primary"
                  : "hover:text-primary"
              }
              to={"/adminAllTour"}
            >
              All Tours
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-lg hover:text-primary"
                  : "hover:text-primary"
              }
              to={"/adminAddTour"}
            >
              Add Tour
            </NavLink>
          </div>
        )}

        <span onClick={Logout} className="cursor-pointer hover:text-primary">
          Logout
        </span>
      </div>
    </div>
  );
};

export default AdminSidebar;
