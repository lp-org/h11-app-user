import { IonImg } from "@ionic/react";

import { fastFood } from "ionicons/icons";
import { HTMLAttributes } from "react";

interface ProductBatchBoxProps {
  height?: number;
  width?: number;
  src: string | null;
}

const Image: React.FC<
  ProductBatchBoxProps & HTMLAttributes<HTMLIonImgElement>
> = ({ height, width, src, ...rest }) => {
  if (src) {
    return (
      <IonImg
        src={src.replace("http://", "https://")}
        {...rest}
        style={{ ...rest.style, height, width }}
      />
    );
  } else {
    return (
      <IonImg
        src={fastFood}
        {...rest}
        style={{ ...rest.style, height, width }}
      />
    );
  }
};

export default Image;
