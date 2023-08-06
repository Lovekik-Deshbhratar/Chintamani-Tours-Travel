import React from "react";
import AdminNavbar from "../../Component/Admin/AdminNavbar";
import AdminSidebar from "../../Component/Admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex lg:min-h-screen">
        <AdminSidebar />
        <div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
