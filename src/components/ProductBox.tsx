import { IonCard } from "@ionic/react";
import { useHistory } from "react-router";
import { Product } from "../types/product";
import Image from "./Image";

interface ProductBoxProps {
  item: Product;
}

const ProductBox: React.FC<ProductBoxProps> = ({ item }) => {
  const history = useHistory();
  return (
    <IonCard
      onClick={() => history.push(`/product/${item.prd_code}`)}
      style={{
        position: "relative",
        margin: 0,
        borderRadius: 10,
        textAlign: "center",
        height: "100%",
        width: 150,
      }}
    >
      <div style={{ padding: 8, textAlign: "center", height: "130px" }}>
        <Image
          imgSrc={item.prd_image}
          width={120}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
      <div style={{ padding: 8, textAlign: "left" }}>
        <div className="wrap-text">
          <b>{item.prd_name}</b>
        </div>
        <div className="wrap-text">
          <small>Manufacture Date: {item.prd_name} </small>
        </div>
        <div className="wrap-text">
          <small>Expiry Date: {item.prd_name} </small>
        </div>
        <div className="wrap-text">
          <small>Batch: {item.prd_name} </small>
        </div>
      </div>
    </IonCard>
  );
};

export default ProductBox;
