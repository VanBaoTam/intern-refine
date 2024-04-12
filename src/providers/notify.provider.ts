import { NotificationProvider, OpenNotificationParams } from "@refinedev/core";
import { toast } from "react-toastify";
export const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }: OpenNotificationParams) => {
    if (type === "success") {
      toast(message, {
        toastId: key || "notif",
        type,
      });
    }
    if (type === "error") {
      toast(message, {
        toastId: key,
        type,
      });
    }
  },
  close: (key) => {
    toast.dismiss(key);
  },
};
