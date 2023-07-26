import React from "react";
import { useParams } from "react-router-dom";

const TourDetails = () => {
  let { id } = useParams();
  console.log(id);
  return <div>TourDetails</div>;
};

export default TourDetails;
