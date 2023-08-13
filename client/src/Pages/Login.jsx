import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Util/config";
import { NotificationContext } from "../Context/NotificationContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { notificationHandler } = useContext(NotificationContext);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handeleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok)
        return notificationHandler({
          type: "error",
          message: result?.message,
        });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data,
        role: result.role,
      });

      if (result.role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
      notificationHandler({
        type: "success",
        message: result?.message,
      });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
  return (
    <div className="h-screen md:flex md:justify-center md:items-center">
      <div className="px-7 py-16 md:px-0 md:py-0 md:w-[95%] md:h-[80%] lg:w-[80%] lg:h-[80%] xl:w-[60%] xl:h-[80%] md:flex md:bg-white md:rounded-3xl">
        <div className="hidden w-[40rem] bg-secondary my-4 ml-4 rounded-2xl md:flex text-white">
          <div className="py-12 px-10 md:space-y-16 2xl:space-y-[5.8rem]">
            <h1 className="text-sm font-semibold">
              <Link to={"/"}>CHINTAMANI TOURS & TRAVEL</Link>
            </h1>
            <div className="md:space-y-5 xl:space-y-7">
              <p className="md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold tracking-wide">
                Start your
                <br /> journey with us.
              </p>
              <p
                className="md:text-base
               2xl:text-lg"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                a repellat minima ducimus fuga ad?
              </p>
            </div>
            <div>
              <img
                src="/Asset/welcome.svg"
                alt=""
                className="animate-up-down"
              />
            </div>
          </div>
        </div>
        <div className="bg-white px-5 py-10 lg:px-16 lg:py-20 rounded-xl shadow-xl md:rounded-none md:shadow-none space-y-10 md:w-full">
          <div className="space-y-4">
            <h1 className="text-black text-3xl font-bold">Login</h1>
            <h1 className="">
              Dont't have an account?{" "}
              <Link
                className="text-primary hover:text-secondary"
                to={"/signup"}
              >
                Register
              </Link>
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <h1 className="font-semibold text-gray-500">Email</h1>
              <input
                name="email"
                value={credentials.email}
                onChange={handeleChange}
                type="text"
                className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
              />
            </div>
            <div className="space-y-3">
              <h1 className="font-semibold text-gray-500">Password</h1>
              <input
                name="password"
                value={credentials.password}
                onChange={handeleChange}
                type="password"
                className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary tracking-widest font-semibold text-black"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full md:w-[10rem] bg-secondary text-white py-2 rounded-lg hover:bg-primary focus:bg-primary active:bg-[#fec595] active:scale-[0.97] transition-all ease-in-out duration-300 font-semibold mt-5"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
