import React, { useContext, useState } from "react";
import EmailAuthContext from "../Context/EmailAuthContext";
import { NotificationContext } from "../Context/NotificationContext";
import { BASE_URL } from "../util/config";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Key } from "lucide-react";
import { motion } from "framer-motion";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "This is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email";
  }

  return errors;
};

const ForgotPassword = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { forgotEmail, setForgotEmail, setOtp } = useContext(EmailAuthContext);
  const { notificationHandler } = useContext(NotificationContext);
  const [disabled, setDisabled] = useState(false);

  const handeleChange = (e) => {
    const { name, value } = e.target;
    setForgotEmail((prev) => ({ ...prev, [name]: value }));
    setError(validate({ ...forgotEmail, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();

    const OTP = Math.floor(Math.random() * 9000 + 1000);
    setOtp(OTP);
    try {
      const emailAuthObj = {
        email: forgotEmail.email,
        otp: OTP,
      };

      const res = await fetch(`${BASE_URL}/users/forgotPassword`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(emailAuthObj),
      });

      const result = await res.json();

      if (!res.ok) {
        notificationHandler({
          type: "error",
          message: result.message,
        });
        setDisabled(false);
        return;
      }

      notificationHandler({
        type: "success",
        message: result.message,
      });
      navigate("/optInput");
    } catch (error) {
      notificationHandler({
        type: "error",
        message: error.message,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
      viewport={{ once: true }}
      className="h-screen flex justify-center"
    >
      <div className="bg-white px-5 py-10 w-[24rem] h-fit md:w-[26rem] rounded-xl shadow-xl mt-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/5 flex justify-center items-center rounded-full">
            <span className="flex justify-center items-center bg-primary/10 w-11 h-11 rounded-full">
              <Key className="text-primary" />
            </span>
          </div>
        </div>
        <div className="space-y-3 mt-5">
          <h1 className="text-3xl text-center font-semibold">
            Forgot password?
          </h1>
          <p className="text-center text-gray-400 ">
            No worries, we'll send you reset instruction.
          </p>
        </div>
        <div className="space-y-3 mt-10">
          <h1 className="font-semibold text-gray-500">Email</h1>
          <input
            name="email"
            value={forgotEmail.email}
            onChange={handeleChange}
            type="text"
            className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
          />
          {error?.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm mt-1 mb-2 text-gray-500"
            >
              {error.email}
            </motion.p>
          )}
        </div>
        <div className="mt-1">
          <button
            disabled={
              Object.keys(error).length > 0 ||
              forgotEmail.email == "" ||
              disabled
            }
            onClick={handleSubmit}
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary focus:bg-primary active:bg-[#fec595] active:scale-[0.97] transition-all ease-in-out duration-300 font-semibold mt-5 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Send mail
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="space-x-3 text-gray-400 font-semibold"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="inline" />
            <span className="text-sm">Back to log in</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
