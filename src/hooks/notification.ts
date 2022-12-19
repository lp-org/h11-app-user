import { useIonToast } from "@ionic/react";

import { useCallback } from "react";
import "./toast.css";
type PopUpMessageType = "success" | "error";

export function usePopUpMessage() {
  const [present] = useIonToast();

  return useCallback(
    (message: string, type: PopUpMessageType) =>
      present({
        message,

        icon:
          type === "success"
            ? "/assets/icon/success.svg"
            : "/assets/icon/error.svg",
        color: type === "success" ? "tsuccess" : "tdanger",
        duration: 1500,
        position: "top",
        cssClass: "margin-top:40px",

        buttons: [
          {
            text: "x",
            role: "cancel",
          },
        ],
      }),
    [present]
  );
}
