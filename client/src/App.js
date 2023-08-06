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

function App() {
  return (
    <div className="w-full bg-primary/5 selection:bg-primary/10 selection:text-primary/75">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminAddTour" element={<AdminAddTour />} />
        <Route path="/adminAllTour" element={<AdminAllTour />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
