import React, { useContext } from "react";
import { NotificationContext } from "../Context/NotificationContext";
import { Check, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Notification = () => {
  const { showNotification, type, message } = useContext(NotificationContext);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className="absolute mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {type === "success" && (
            <div className="p-4 bg-green-50/60  rounded-xl ring-2 ring-green-200/75 shadow">
              <div className="flex items-center gap-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-green-400 flex justify-center items-center rounded-full">
                    <span className="flex justify-center items-center bg-white w-[1.35rem] h-[1.35rem] rounded-full shadow">
                      <Check className="text-green-600 p-0.5" />
                    </span>
                  </div>
                </div>
                <p className="font-semibold tracking-wide text-gray-800">
                  {message}
                </p>
              </div>
            </div>
          )}
          {type === "error" && (
            <div className="p-4 bg-red-50/60  rounded-xl ring-2 ring-red-200/75 shadow">
              <div className="flex items-center gap-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-red-500 flex justify-center items-center rounded-full">
                    <span className="flex justify-center items-center bg-white w-[1.35rem] h-[1.35rem] rounded-full shadow">
                      <X className="text-red-600 p-0.5" />
                    </span>
                  </div>
                </div>
                <p className="font-semibold tracking-wide text-gray-800">
                  {message}
                </p>
              </div>
            </div>
          )}
          {type === "warning" && (
            <div className="p-4 bg-yellow-50/60  rounded-xl ring-2 ring-yellow-200/75 shadow">
              <div className="flex items-center gap-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-yellow-400 flex justify-center items-center rounded-full">
                    <span className="flex justify-center items-center bg-white w-[1.40rem] h-[1.40rem] rounded-full shadow">
                      <AlertTriangle className="text-yellow-600 p-1" />
                    </span>
                  </div>
                </div>
                <p className="font-semibold tracking-wide text-gray-800">
                  {message}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
