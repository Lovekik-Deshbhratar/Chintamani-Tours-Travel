import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Tours from "./Pages/Tours";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import TourDetails from "./Pages/TourDetails";

function App() {
  return (
    <div className="w-full  bg-primary/5 selection:bg-primary/10 selection:text-primary/75">
      <Navbar />
      <div className="space-y-9">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
