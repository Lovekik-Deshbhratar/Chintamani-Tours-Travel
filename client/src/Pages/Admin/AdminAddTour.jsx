import React, { useContext } from "react";
import AdminNavbar from "../../Component/Admin/AdminNavbar";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../../Util/config";
import { NotificationContext } from "../../Context/NotificationContext";
import { motion } from "framer-motion";

const AdminAddTour = () => {
  const [image, setImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { notificationHandler } = useContext(NotificationContext);

  const uploadImage = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file?.size > 256000) {
      alert("Your Image Should be Below 250kb.");
    } else {
      const { name } = e.target;
      const base64 = await converBase64(file);
      setFieldValue([name], base64);
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

  return (
    <div>
      <AdminNavbar />
      <div className="flex md:min-h-screen">
        <AdminSidebar />
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex-grow bg-white"
          >
            <div className="flex flex-col items-center mt-[10rem] md:mt-[20rem] space-y-3">
              <div>
                <h1 className="text-3xl capitalize">Tour is added</h1>
              </div>
              <div>
                <button
                  className="capitalize bg-secondary py-1.5 px-3 text-white rounded-lg font-semibold hover:bg-primary transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]"
                  onClick={() => setIsSubmitted(!isSubmitted)}
                >
                  add another tour
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
            className="px-10 py-8 flex-grow space-y-6"
          >
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Add Tour
              </h1>
              <span className="text-sm capitalize text-gray-500">
                add tour here
              </span>
            </div>
            <Formik
              initialValues={{
                title: "",
                location: "",
                price: "",
                date: "",
                photo: "",
                description: "",
                quote: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .max(30, "Must be 30 characters or less")
                  .required("This is a Required"),
                location: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("This is a Required"),
                date: Yup.date().required("This is a Required"),
                price: Yup.number().required("This is a Required"),
                description: Yup.string(),
              })}
              onSubmit={async (values, action) => {
                try {
                  const res = await fetch(`${BASE_URL}/tours`, {
                    method: "post",
                    headers: {
                      "content-type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(values),
                  });

                  const result = await res.json();

                  if (!res.ok)
                    return notificationHandler({
                      type: "error",
                      message: result.message,
                    });

                  action.resetForm();
                  setImage("");
                  setIsSubmitted(!isSubmitted);
                } catch (error) {
                  notificationHandler({
                    type: "success",
                    message: error.message,
                  });
                }
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-3 lg:col-span-2">
                      <h1 className="font-semibold text-gray-500">
                        Tour Image *
                      </h1>
                      <img
                        src={image}
                        alt=""
                        className="rounded-md md:w-[20rem]"
                      />
                      <input
                        required
                        type="file"
                        accept="image/*"
                        className="w-fit"
                        name="photo"
                        onChange={(e) => {
                          uploadImage(e, formik.setFieldValue);
                        }}
                      />
                    </div>
                    <div className="space-y-3 ">
                      <h1 className="font-semibold text-gray-500">
                        Tour Title *
                      </h1>
                      <input
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <p className="text-sm mt-1 mb-2 text-red-500">
                          {formik.errors.title}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <h1 className="font-semibold text-gray-500">
                        Tour Location *
                      </h1>
                      <input
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                      />
                      {formik.touched.location && formik.errors.location ? (
                        <p className="text-sm mt-1 mb-2 text-red-500">
                          {formik.errors.location}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <h1 className="font-semibold text-gray-500">
                        Tour Date *
                      </h1>
                      <input
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="date"
                        className="w-full outline-none rounded-md ring-1 ring-gray-300 py-2.5 px-4 focus:ring-1 focus:ring-secondary  "
                      />
                      {formik.touched.date && formik.errors.date ? (
                        <p className="text-sm mt-1 mb-2 text-red-500">
                          {formik.errors.date}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <h1 className="font-semibold text-gray-500">
                        Tour Price *
                      </h1>
                      <input
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <p className="text-sm mt-1 mb-2 text-red-500">
                          {formik.errors.price}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-3 lg:col-span-2">
                      <h1 className="font-semibold text-gray-500">
                        Description
                      </h1>
                      <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="resize-none w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary text-black h-[9rem]"
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <p className="text-sm mt-1 mb-2 text-red-500">
                          {formik.errors.description}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <h1 className="font-semibold text-gray-500">Quote *</h1>
                      <input
                        required
                        name="quote"
                        onChange={(e) => {
                          uploadImage(e, formik.setFieldValue);
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
                      <button
                        type="reset"
                        className="bg-gray-400 py-1.5 px-3 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all ease-in-out duration-300 active:bg-[#fec595] active:scale-[0.9]"
                        onClick={() => {
                          formik.resetForm();
                          setImage("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminAddTour;
