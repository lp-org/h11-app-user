import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { useState } from "react";
import { checkFile } from "utils";
import { usePopUpMessage } from "./notification";

export const useTakePicture = () => {
  const popUpMsg = usePopUpMessage();
  const [blob, setBlob] = useState<Blob>();
  const [photo, setPhoto] = useState<Photo>();
  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        width: 800,
        height: 800,
      });

      const blob = await checkFile(image);
      setBlob(blob);
      setPhoto(image);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        popUpMsg(error.message, "error");
      }
    }
  };
  return { takePicture, blob, photo };
};
