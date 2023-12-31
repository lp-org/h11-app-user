import dayjs from "dayjs";
import { useHistory } from "react-router";
import { ProductBatch } from "types/productBatch";

interface ProductBatchBoxProps {
  item: ProductBatch;
}

const ProductBatchBox: React.FC<ProductBatchBoxProps> = ({ item }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/productBatch/${item.pbth_code}`)}
      style={{
        borderColor: "#999999",
        border: "solid 1px",
        position: "relative",
        margin: 0,
        borderRadius: 10,
        textAlign: "center",
        height: "100%",
        width: 150,
      }}
    >
      <div className="wrap-text ion-margin">
        <b>{item.pbth_code}</b>
      </div>
      <div style={{ padding: 8, textAlign: "left" }}>
        <div className="wrap-text">
          <small>Product Name: {item.pbth_prd_name} </small>
        </div>
        <div className="wrap-text">
          <small>Product ID: {item.pbth_prd_code} </small>
        </div>
        <div className="wrap-text">
          <small>
            Manufactured Date:
            {dayjs(item.pbth_manufactured_date).format("DD/MM/YYYY")}{" "}
          </small>
        </div>
        <div className="wrap-text">
          <small>
            Expiry Date: {dayjs(item.pbth_expiry_date).format("DD/MM/YYYY")}{" "}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductBatchBox;
