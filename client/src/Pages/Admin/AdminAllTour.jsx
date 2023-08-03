import React from "react";
import AdminNavbar from "../../Component/Admin/AdminNavbar";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import TourDatatable from "../../Component/Admin/TourDatatable";

const AdminAllTour = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex md:min-h-screen">
        <AdminSidebar />
        <div className="px-10 py-8 flex-grow">
          <TourDatatable />
        </div>
      </div>
    </div>
  );
};

export default AdminAllTour;
