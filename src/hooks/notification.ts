import { useIonToast } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { useCallback } from "react";

type PopUpMessageType = "success" | "error";

export function usePopUpMessage() {
  const [present] = useIonToast();

  return useCallback(
    (message: string, type: PopUpMessageType) =>
      present({
        message,
        icon: type === "success" ? checkmarkCircle : closeCircle,
        color: type === "success" ? "success" : "danger",
        duration: 1500,
        position: "top",
        cssClass: "margin-top:20px",
      }),
    [present]
  );
}
