import { createContext, useState } from "react";

const EmailAuthContext = createContext();

export const EmailAuthContextProvider = ({ children }) => {
  const [forgotEmail, setForgotEmail] = useState({ email: "" });
  const [otp, setOtp] = useState();

  return (
    <EmailAuthContext.Provider
      value={{ forgotEmail, setForgotEmail, otp, setOtp }}
    >
      {children}
    </EmailAuthContext.Provider>
  );
};

export default EmailAuthContext;
