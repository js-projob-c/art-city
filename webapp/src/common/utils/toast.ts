import toast from "react-hot-toast";

export const toastErrorCode = (error: any) => {
  if (error?.["data"]?.code) {
    toast.error(error?.["data"]?.code);
  } else {
    toast.error("Failed");
  }
};
