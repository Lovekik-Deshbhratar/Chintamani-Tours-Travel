import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Tours from "./Pages/Tours";
import TourDetails from "./Pages/TourDetails";
import Thanks from "./Pages/Thanks";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminAddTour from "./Pages/Admin/AdminAddTour";
import AdminAllTour from "./Pages/Admin/AdminAllTour";
import SearchResult from "./Pages/SearchResult";
import Notification from "./util/Notification";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import roles from "./util/roles";
import ProtectedRoute from "./util/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import OTPInput from "./Pages/OTPInput";
import PasswordReset from "./Pages/PasswordReset";

function App() {
  const { role } = useContext(AuthContext);
  return (
    <>
      <div className="flex justify-center">
        <Notification />
      </div>
      <div className="w-full bg-primary/5 selection:bg-primary/10 selection:text-primary/75 font-opensans">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tours/search" element={<SearchResult />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/optInput" element={<OTPInput />} />
          <Route path="/passwordReset" element={<PasswordReset />} />

          {/* Route protected for User only */}
          <Route
            path="/thanks"
            element={
              <ProtectedRoute allowedRole={roles.User} getRole={role}>
                <Thanks />
              </ProtectedRoute>
            }
          />

          {/* Route protected for Admin only */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute allowedRole={roles.Admin} getRole={role}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminAddTour"
            element={
              <ProtectedRoute allowedRole={roles.Admin} getRole={role}>
                <AdminAddTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminAllTour"
            element={
              <ProtectedRoute allowedRole={roles.Admin} getRole={role}>
                <AdminAllTour />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
