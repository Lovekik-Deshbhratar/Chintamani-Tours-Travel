import React, { useEffect, useState } from "react";
import axios from "axios";

const TourDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTours();
  }, []);

  const getTours = async () => {
    const response = await axios.get("http://localhost:8080/api/tour/all");
    setData(response.data);
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          All Tour
        </h1>
      </div>
    </div>
  );
};

export default TourDatatable;
