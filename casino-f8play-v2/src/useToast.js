import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Toast from "./components/common/Toast";

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const success = (message) => showToast(message, "success");
  const error = (message) => showToast(message, "error");

  const ToastContainer = toast && (
    <Toast message={toast.message} setToast={setToast} type={toast.type} />
  );

  return { success, error, ToastContainer };
};

export default useToast;
