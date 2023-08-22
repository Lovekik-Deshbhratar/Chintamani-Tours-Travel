import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../util/config";
import useFetch from "../../Hooks/useFetch";
import { ChevronLeft, ChevronRight, PencilLine, Trash, X } from "lucide-react";
import { NotificationContext } from "../../Context/NotificationContext";
import { motion } from "framer-motion";

const TourDatatable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editValue, setEditValue] = useState({
    title: "",
    location: "",
    price: "",
    date: "",
    photo: "",
    description: "",
    quote: "",
  });
  const [image, setImage] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [sort, setSort] = useState(-1);
  const [page, setPage] = useState(0);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const { notificationHandler } = useContext(NotificationContext);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    getTours();
  }, [page, tourCount]);

  const getTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/tours?page=${page}&sort=${sort}`);
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

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pageCount - 1) {
      setPage(page + 1);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file?.size > 256000) {
      notificationHandler({
        type: "success",
        message: "Your Image Should be Below 250kb",
      });
    } else {
      const { name } = e.target;
      const base64 = await converBase64(file);
      setEditValue([name], base64);
      if ([name] == "photo") setImage(base64);
    }
  };

  const converBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "delete",
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result?.message,
        });

      notificationHandler({
        type: "success",
        message: result?.message,
      });
      getTours();
    } catch (error) {
      notificationHandler({
        type: "error",
        message: error?.message,
      });
    }
  };

  const handleGetOne = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`);

      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result.message,
        });
      const result = await res.json();

      setEditValue({
        ...editValue,
        id: id,
        title: result.data.title,
        location: result.data.location,
        price: result.data.price,
        date: result.data.date,
        photo: result.data.photo,
        description: result.data.description,
        quote: result.data.quote,
      });
    } catch (error) {
      notificationHandler({
        type: "success",
        message: error.message,
      });
    }
  };

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const editValueObj = { ...editValue };
    delete editValueObj.id;

    try {
      const res = await fetch(`${BASE_URL}/tours/${editValue.id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editValueObj),
      });

      const result = await res.json();

      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result.message,
        });

      notificationHandler({
        type: "success",
        message: result?.message,
      });
      handleToggle();
      getTours();
    } catch (error) {
      notificationHandler({
        type: "success",
        message: error.message,
      });
    }
  };
  return (
    <div>
      {showForm ? null : (
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            All Tour ({tourCount})
          </h1>
        </div>
      )}
      {loading && <h1 className="text-xl text-center">Loading...</h1>}
      {error && <h1 className="text-xl">{error}</h1>}
      {!loading &&
        !error &&
        (showForm ? (
          <div>
            <div className="flex justify-end">
              <button className="text-gray-500" onClick={handleToggle}>
                <X size={30} />
              </button>
            </div>
            <form onSubmit={handleEdit} autoComplete="off">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-2"
              >
                <div className="space-y-3 lg:col-span-2">
                  <h1 className="font-semibold text-gray-500">Tour Image</h1>
                  <img
                    src={editValue.photo != undefined ? editValue.photo : image}
                    alt=""
                    className="rounded-md md:w-[20rem]"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-fit"
                    name="photo"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </div>
                <div className="space-y-3 ">
                  <h1 className="font-semibold text-gray-500">Tour Title</h1>
                  <input
                    name="title"
                    value={editValue.title}
                    onChange={(e) =>
                      setEditValue({ ...editValue, title: e.target.value })
                    }
                    type="text"
                    className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                  />
                </div>
                <div className="space-y-3">
                  <h1 className="font-semibold text-gray-500">Tour Location</h1>
                  <input
                    name="location"
                    value={editValue.location}
                    onChange={(e) =>
                      setEditValue({ ...editValue, location: e.target.value })
                    }
                    type="text"
                    className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                  />
                </div>
                <div className="space-y-3">
                  <h1 className="font-semibold text-gray-500">Tour Date</h1>
                  <input
                    name="date"
                    value={editValue.date}
                    onChange={(e) =>
                      setEditValue({ ...editValue, date: e.target.value })
                    }
                    type="date"
                    className="w-full outline-none rounded-md ring-1 ring-gray-300 py-2.5 px-4 focus:ring-1 focus:ring-secondary  "
                  />
                </div>
                <div className="space-y-3">
                  <h1 className="font-semibold text-gray-500">Tour Price</h1>
                  <input
                    name="price"
                    value={editValue.price}
                    onChange={(e) =>
                      setEditValue({ ...editValue, price: e.target.value })
                    }
                    type="text"
                    className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                  />
                </div>
                <div className="space-y-3 lg:col-span-2">
                  <h1 className="font-semibold text-gray-500">Description</h1>
                  <textarea
                    name="description"
                    value={editValue.description}
                    onChange={(e) =>
                      setEditValue({
                        ...editValue,
                        description: e.target.value,
                      })
                    }
                    type="text"
                    className="resize-none w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary text-black h-[9rem]"
                  />
                </div>
                <div className="space-y-3">
                  <h1 className="font-semibold text-gray-500">Quote</h1>
                  <input
                    name="quote"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    type="file"
                    className="w-fit outline-none"
                  />
                </div>
                <div className="space-x-4 lg:row-start-6 mt-6">
                  <button
                    type="submit"
                    className="bg-secondary py-1.5 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            </form>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md">
            <table className="w-full mt-10 bg-white">
              <thead className="border-b h-16">
                <tr className="text-end">
                  <th className="w-[8rem] pl-4">Thumbnail</th>
                  <th className="w-[17rem]">Title</th>
                  <th className="w-[20rem]">Location</th>
                  <th className="w-[20rem]">Date</th>
                  <th className="w-[17rem]">Price</th>
                  <th className="pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-end">
                {data.map((tour) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
                    key={tour?._id}
                  >
                    <td className="flex justify-end pl-4">
                      <img
                        src={tour?.photo}
                        className="rounded w-[5rem] my-2 "
                      />
                    </td>
                    <td>{tour?.title}</td>
                    <td>{tour?.location}</td>
                    <td>
                      {new Date(tour?.date).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </td>
                    <td>{tour?.price}</td>
                    <td className="pr-6 space-x-8">
                      <button
                        onClick={() => handleDelete(tour?._id)}
                        className="hover:text-red-600 transition ease-in-out duration-300 "
                      >
                        <Trash />
                      </button>
                      <button
                        onClick={() => {
                          handleGetOne(tour?._id);
                          handleToggle();
                        }}
                        className="hover:text-violet-500 transition ease-in-out duration-300"
                      >
                        <PencilLine />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6">
                    <div className="flex items-center justify-end space-x-4 my-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 0}
                        className="px-3 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="inline" />
                      </button>
                      <span>
                        Page {page + 1} of {pageCount}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={page === pageCount - 1}
                        className="px-3 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="inline" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
    </div>
  );
};

export default TourDatatable;
