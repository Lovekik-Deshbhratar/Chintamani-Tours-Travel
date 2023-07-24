import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Tours from "./Pages/Tours";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div className="w-full space-y-3  bg-primary/5 selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
