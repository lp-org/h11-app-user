import { useHistory } from "react-router";
import { Product } from "../types/product";

interface ProductBoxProps {
  item: Product;
}

const ProductBox: React.FC<ProductBoxProps> = ({ item }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push("/")}
      style={{
        borderColor: "#999999",
        border: "solid 1px",
        position: "relative",
        margin: 0,
        borderRadius: 10,
        textAlign: "center",
        height: 170,
        width: 150,
      }}
    >
      <img alt="Food" src={"/assets/products/chip.png"} />

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
    </div>
  );
};

export default ProductBox;
