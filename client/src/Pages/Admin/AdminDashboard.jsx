import React, { useContext } from "react";
import AdminNavbar from "../../Component/Admin/AdminNavbar";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { AuthContext } from "../../Context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <AdminNavbar />
      <div className="flex lg:min-h-screen">
        <AdminSidebar />
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold mt-4 ml-4">
            Hello, {user.username}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
