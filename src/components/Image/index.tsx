import { fastFood } from "ionicons/icons";

import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
interface ProductBatchBoxProps extends LazyLoadImageProps {
  height?: number;
  width?: number;
  imgSrc?: string | null;
}

const Image: React.FC<ProductBatchBoxProps> = ({
  height,
  width,
  imgSrc,
  ...rest
}) => {
  return (
    <LazyLoadImage
      placeholderSrc={"/assets/placeholder.png"}
      src={
        imgSrc && imgSrc.substring(0, 7) === "http://"
          ? imgSrc.replace("http://", "https://")
          : imgSrc || fastFood
      }
      {...rest}
      alt={""}
      style={{ ...rest.style }}
      width={width}
      height={height || width}
    />
  );
};

export default Image;
