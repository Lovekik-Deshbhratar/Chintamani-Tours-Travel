import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Icon from "../Icon";

const AdminSidebar = () => {
  const [isSubMenu, setIsSubMenu] = useState(false);

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
        <NavLink>Dashboard</NavLink>
        <NavLink className="">
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
          <div className="flex flex-col -mt-4 gap-2">
            <NavLink to={"/adminAllTour"}>All Tours</NavLink>
            <NavLink to={"/adminAddTour"}>Add Tour</NavLink>
          </div>
        )}

        <NavLink to={"/"}>Logout</NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
