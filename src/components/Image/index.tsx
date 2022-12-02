import { IonImg } from "@ionic/react";
import { environment } from "environment/environment";
import { fastFood } from "ionicons/icons";
import { HTMLAttributes } from "react";

interface ProductBatchBoxProps {
  height?: number;
  width?: number;
  src: string | null;
  rest?: HTMLAttributes<HTMLIonImgElement>;
}

const Image: React.FC<
  ProductBatchBoxProps & HTMLAttributes<HTMLIonImgElement>
> = ({ height, width, src, ...rest }) => {
  if (src) {
    return (
      <IonImg
        src={environment.supabaseImageSrc + src}
        style={{ ...rest.style, height, width }}
        {...rest}
      />
    );
  } else {
    return (
      <IonImg
        src={fastFood}
        style={{ ...rest.style, height, width }}
        {...rest}
      />
    );
  }
};

export default Image;
