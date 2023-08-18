import { ArrowLeft, Key } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Util/config";
import { NotificationContext } from "../Context/NotificationContext";
import EmailAuthContext from "../Context/EmailAuthContext";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "This is a required field.";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

const PasswordReset = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const { notificationHandler } = useContext(NotificationContext);
  const { forgotEmail, setForgotEmail, setOtp } = useContext(EmailAuthContext);

  const handeleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError(validate({ ...credentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const emailAuthObj = {
        email: forgotEmail.email,
        newPassword: credentials.confirmPassword,
      };

      const res = await fetch(`${BASE_URL}/users/updatePassword`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(emailAuthObj),
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
      setForgotEmail({ email: "" });
      setOtp(undefined);
      navigate("/login");
    } catch (error) {
      notificationHandler({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center">
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
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <div className="space-y-3 mt-10">
          <h1 className="font-semibold text-gray-500">New password</h1>
          <input
            name="password"
            value={credentials.password}
            onChange={handeleChange}
            type="text"
            className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
          />
          {error?.password && (
            <p className="text-sm mt-1 mb-2 text-gray-500">{error.password}</p>
          )}
        </div>
        <div className="space-y-3 mt-10">
          <h1 className="font-semibold text-gray-500">Confirm password</h1>
          <input
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handeleChange}
            type="password"
            className="w-full outline-none rounded-md ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
          />
          {error?.confirmPassword && (
            <p className="text-sm mt-1 mb-2 text-gray-500">
              {error.confirmPassword}
            </p>
          )}
        </div>
        <div className="mt-1">
          <button
            disabled={Object.keys(error).length > 0}
            onClick={handleSubmit}
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary focus:bg-primary active:bg-[#fec595] active:scale-[0.97] transition-all ease-in-out duration-300 font-semibold mt-5 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Reset password
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="space-x-3 text-gray-400 font-semibold"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="inline" />
            <span className="text-sm">Back to log in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
