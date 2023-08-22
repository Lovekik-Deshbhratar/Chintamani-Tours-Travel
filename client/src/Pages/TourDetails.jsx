import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IndianRupee, MapPin } from "lucide-react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { BASE_URL } from "../Util/config";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";
import Booking from "../Component/Booking";
import { motion } from "framer-motion";

const TourDetails = () => {
  let { id } = useParams();
  const [review, setReview] = useState("");
  const { user, role } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { notificationHandler } = useContext(NotificationContext);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

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

  const handleReview = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        notificationHandler({
          type: "error",
          message: "Please Log In",
        });
        window.scrollTo(0, 0);
        return;
      }

      if (role === "admin") {
        notificationHandler({
          type: "error",
          message: "You are not allowed",
        });
        window.scrollTo(0, 0);
        return;
      }

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

      if (!res.ok) {
        notificationHandler({
          type: "error",
          message: result.message,
        });
        window.scrollTo(0, 0);
        return;
      }

      notificationHandler({
        type: "success",
        message: result.message,
      });
      window.scrollTo(0, 0);
      fetchData();
      setReview("");
    } catch (error) {
      notificationHandler({
        type: "error",
        message: error.message,
      });
      window.scrollTo(0, 0);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                viewport={{ once: true }}
                src={photo}
                alt=""
                className="rounded-md mb-11 w-full object-cover "
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
              viewport={{ once: true }}
              className="rounded-md border px-5 py-7 md:px-7 space-y-5 bg-white "
            >
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
            </motion.div>
            <div className="space-y-8 rounded-md border px-5 py-7 md:px-7 md:py-8 bg-white">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-semibold"
              >
                Reviews ({reviews?.length})
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                viewport={{ once: true }}
                className="relative"
              >
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
              </motion.div>
              <div className="px-1 space-y-6">
                {currentReviews?.map((review, key) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                    className=" flex gap-4"
                    key={review?._id}
                  >
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
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <ul className="flex space-x-2">
                  {Array.from({
                    length: Math.ceil(reviews?.length / reviewsPerPage),
                  }).map((_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`py-2 px-4 rounded-full font-semibold ${
                          currentPage === index + 1
                            ? "bg-secondary text-white"
                            : "bg-white text-secondary ring ring-secondary"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Booking tour={data} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default TourDetails;
