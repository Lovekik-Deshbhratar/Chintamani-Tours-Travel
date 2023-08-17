import React, { useContext, useEffect, useState } from "react";
import EmailAuthContext from "../Context/EmailAuthContext";
import { BASE_URL } from "../Util/config";
import { NotificationContext } from "../Context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const OTPInput = () => {
  const { forgotEmail, otp } = useContext(EmailAuthContext);
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const { notificationHandler } = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Each count lasts for a second cleanup the interval on complete
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const handleResend = async () => {
    try {
      const emailAuthObj = {
        email: forgotEmail.email,
        otp: otp,
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
        setDisable(false);
        return;
      }

      notificationHandler({
        type: "success",
        message: "A new OTP has succesfully been sent to your email",
      });
      setTimer(60);
      setDisable(true);
    } catch (error) {
      notificationHandler({
        type: "error",
        message: error.message,
      });
      setDisable(false);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (parseInt(OTPinput.join("")) === otp) {
      return navigate("/passwordReset");
    } else {
      return notificationHandler({
        type: "error",
        message:
          "The code you have entered is not correct, try again or re-send the link",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center">
      <form onSubmit={handleVerify}>
        <div className="bg-white px-5 py-10 w-[24rem] md:w-[26rem] h-fit rounded-xl shadow-xl mt-10">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/5 flex justify-center items-center rounded-full">
              <span className="flex justify-center items-center bg-primary/10 w-11 h-11 rounded-full">
                <Mail className="text-primary" />
              </span>
            </div>
          </div>
          <div className="space-y-3 mt-5">
            <h1 className="text-3xl text-center font-semibold">
              Check your email
            </h1>
            <p className="text-gray-600 text-center">
              We have sent a code to your email "{forgotEmail.email}"
            </p>
          </div>
          <div className="mt-10">
            <div className="flex gap-6 justify-center">
              <input
                onChange={(e) =>
                  setOTPinput([
                    e.target.value,
                    OTPinput[1],
                    OTPinput[2],
                    OTPinput[3],
                  ])
                }
                maxLength={1}
                type="text"
                className="outline-none rounded-xl w-[4rem] h-[4rem] text-center text-3xl ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
              />
              <input
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    e.target.value,
                    OTPinput[2],
                    OTPinput[3],
                  ])
                }
                maxLength={1}
                type="text"
                className="outline-none rounded-xl w-[4rem] h-[4rem] text-center text-3xl ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
              />
              <input
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    OTPinput[1],
                    e.target.value,
                    OTPinput[3],
                  ])
                }
                maxLength={1}
                type="text"
                className="outline-none rounded-xl w-[4rem] h-[4rem] text-center text-3xl ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
              />
              <input
                onChange={(e) =>
                  setOTPinput([
                    OTPinput[0],
                    OTPinput[1],
                    OTPinput[2],
                    e.target.value,
                  ])
                }
                maxLength={1}
                type="text"
                className="outline-none rounded-xl w-[4rem] h-[4rem] text-center text-3xl ring-1 ring-gray-300 caret-secondary py-2.5 px-4 focus:ring-1 focus:ring-secondary font-semibold text-black"
              />
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary focus:bg-primary active:bg-[#fec595] active:scale-[0.97] transition-all ease-in-out duration-300 font-semibold mt-5 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Verify account
            </button>
            <div>
              <h1 className="text-center text-gray-600">
                Didn't recieve code?{" "}
                <button
                  disabled={disable}
                  onClick={handleResend}
                  className={
                    disable
                      ? "text-gray-600"
                      : "text-primary cursor-pointer underline"
                  }
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </button>
              </h1>
            </div>
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
      </form>
    </div>
  );
};

export default OTPInput;
