import React from "react";
import AdminNavbar from "../../Component/Admin/AdminNavbar";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AdminAddTour = () => {
  const [image, setImage] = useState("");

  const uploadImage = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file?.size > 256000) {
      alert("Your Image Should be Below 250kb.");
    } else {
      const base64 = await converBase64(file);
      setImage(base64);
      setFieldValue("photo", base64);
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
        <div className="px-10 py-9 flex-grow">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
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
            }}
            onSubmit={(values, action) => {
              axios
                .post("http://localhost:8080/api/tour/create", values)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                className="mt-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">Tour Image</h1>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      name="photo"
                      onChange={(e) => {
                        uploadImage(e, formik.setFieldValue);
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">Tour Title</h1>
                    <input
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">
                      Tour Location
                    </h1>
                    <input
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">Tour Date</h1>
                    <input
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="date"
                      className="w-full outline-none rounded-md ring-1 ring-gray-300 py-2.5 px-4 focus:ring-1 focus:ring-secondary  "
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">Tour Price</h1>
                    <input
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary  text-black"
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-semibold text-gray-500">Description</h1>
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="resize-none w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary text-black"
                    />
                  </div>
                  <div className="space-x-4">
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
                        setImage(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminAddTour;
