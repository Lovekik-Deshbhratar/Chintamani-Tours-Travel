import React, { useContext } from "react";
import { NotificationContext } from "../Context/NotificationContext";
import { Check, X, AlertTriangle } from "lucide-react";

const Notification = () => {
  const { showNotification, type, message } = useContext(NotificationContext);

  return (
    <>
      {showNotification && (
        <div className="absolute mt-4">
          {type === "success" && (
            <div className="p-4 bg-white rounded-lg ring-1 ring-zinc-200 shadow">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 text-green-500 w-fit p-2">
                  <Check className="w-5 h-5" />
                </div>
                <p className="font-normal tracking-wide text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          )}
          {type === "error" && (
            <div className="p-4 bg-white rounded-lg ring-1 ring-zinc-200 shadow">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 text-red-500 w-fit p-2">
                  <X className="w-5 h-5" />
                </div>
                <p className="font-normal tracking-wide text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          )}
          {type === "warning" && (
            <div className="p-4 bg-white rounded-lg ring-1 ring-zinc-200 shadow">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 text-orange-500 w-fit p-2">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="font-normal tracking-wide text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Notification;
