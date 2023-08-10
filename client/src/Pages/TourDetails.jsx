import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndianRupee, MapPin } from "lucide-react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import useFetch from "../Hooks/useFetch";
import { BASE_URL } from "../Util/config";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";

const TourDetails = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    date: "",
    peoples: "",
  });
  let { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { notificationHandler } = useContext(NotificationContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`);
      if (!res.ok) {
        setError("Failed to fetch");
      }
      const result = await res.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const { title, location, price, date, description, photo, quote, reviews } =
    data;

  const options = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    navigate("/thanks");
  };

  const handleReview = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) alert("Please Log In ");

      const reviewObj = {
        username: user?.username,
        reviewText: review,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result.message,
        });

      notificationHandler({
        type: "success",
        message: result.message,
      });
      fetchData();
    } catch (error) {
      notificationHandler({
        type: "success",
        message: error.message,
      });
    }
  };
  return (
    <>
      <Navbar />
      {loading && <h1 className="text-xl">Loading...</h1>}
      {error && <h1 className="text-xl">{error}</h1>}
      {!loading && !error && (
        <div className="px-7 py-4 space-y-6 lg:space-y-0 md:mx-[4%] xl:mx-[10%] my-9 lg:flex lg:gap-6">
          <div className="space-y-6 lg:w-[65%] xl::w-[68%] ">
            <div className="">
              <img
                src={photo}
                alt=""
                className="rounded-md mb-11 w-full object-cover "
              />
            </div>
            <div className="rounded-md border px-5 py-7 md:px-7 space-y-5 bg-white ">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
                <span className="flex gap-2">
                  <MapPin className="p-1" /> {location}
                </span>
                <span className="flex gap-2">
                  <IndianRupee className="p-1" />
                  <span>{price} /per person</span>
                </span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-xl md:text-2xl font-semibold">
                  Description
                </h1>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
            <div className="space-y-8 rounded-md border px-5 py-7 md:px-7 md:py-8 bg-white">
              <h1 className="text-2xl md:text-3xl font-semibold">
                Reviews ({reviews?.length})
              </h1>
              <div className="relative">
                <button
                  onClick={handleReview}
                  className="absolute right-0 mt-1  mr-1 bottom- bg-secondary py-1 px-3  text-white rounded-full font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]"
                >
                  Submit
                </button>
                <input
                  value={review}
                  onChange={(e) => setReview((prev) => e.target.value)}
                  type="text"
                  placeholder="Share your thoughts..."
                  className="w-full bg-primary/[0] ring-1 ring-secondary py-2 px-3 rounded-full caret-secondary outline-none"
                />
              </div>
              <div className="px-1 space-y-6">
                {reviews?.map((review, key) => (
                  <div className=" flex gap-4" key={review?._id}>
                    <img
                      src="/Asset/avatar.jpg"
                      alt=""
                      className="w-16 h-16 mix-blend-multiply "
                    />
                    <div className="">
                      <h1 className="font-semibold text-lg">
                        {review.username}
                      </h1>
                      <h1 className="text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h1>
                      <p className="mt-4 ">{review.reviewText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-md border px-5 py-7 md:px-7 md:py-8 space-y-6 md:space-y-8 bg-white lg:w-[42%] xl:w-[30%] h-fit sticky top-0">
            <div>
              <span className="flex items-center gap-1">
                <IndianRupee className="inline" size={22} />
                <div>
                  <span className="text-2xl md:text-3xl font-semibold">
                    {" "}
                    {price}
                  </span>{" "}
                  <span className="text-gray-600">/per person</span>
                </div>
              </span>
            </div>
            <hr />
            <div className="space-y-6">
              <h1 className="text-xl md:text-2xl font-semibold">Infornation</h1>
              <div className="grid grid-cols-2 border px-3 pt-3 pb-6 gap-4">
                <input
                  name="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
                />
                <input
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone"
                  className="col-span-2 border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
                />
                <input
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  type="date"
                  className="border-b outline-none h-11 px-3 focus:border-black caret-secondary  text-gray-600 bg-primary/[0]"
                />
                <input
                  name="peoples"
                  value={formValues.peoples}
                  onChange={handleChange}
                  type="number"
                  placeholder="No. of People"
                  className="border-b outline-none h-11 px-3 focus:border-black caret-secondary focus:placeholder-black bg-primary/[0]"
                />
              </div>
              <div className="space-y-5 md:space-y-6">
                <div className="flex justify-between md:text-lg text-gray-700">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="inline" size={18} /> {price} x{" "}
                    {formValues?.peoples === "" ? 1 : formValues?.peoples}{" "}
                    person
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="inline" size={18} />{" "}
                    {price *
                      (formValues?.peoples === "" ? 1 : formValues?.peoples)}
                  </span>
                </div>
                <div className="flex justify-between md:text-lg text-gray-700">
                  <span>Service charges</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="inline" size={18} /> {100}
                  </span>
                </div>
                <div className="flex justify-between text-xl md:text-2xl font-semibold">
                  <span>Total</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="inline" size={22} />{" "}
                    {price *
                      (formValues?.peoples === "" ? 1 : formValues?.peoples) +
                      100}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-secondary w-full p-2 text-white rounded-full font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.98] mt-2"
                onClick={handleSubmit}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default TourDetails;
