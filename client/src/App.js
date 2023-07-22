import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {/* <Route path="/about" element={} />
        <Route path="/services" element={} />
        <Route path="/contact" element={} />
        <Route path="*" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
