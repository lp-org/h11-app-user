import { IonCard } from "@ionic/react";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import { ProductBatch } from "types/productBatch";
import Image from "./Image";

interface ProductBatchBoxProps {
  item: ProductBatch;
}

const ProductBatchBox: React.FC<ProductBatchBoxProps> = ({ item }) => {
  const history = useHistory();
  return (
    <IonCard
      onClick={() => history.push(`/productBatch/${item.pbth_code}`)}
      style={{
        position: "relative",
        margin: 0,
        borderRadius: 10,
        textAlign: "center",
        height: "100%",
        width: 150,
      }}
    >
      <div className="ion-margin">
        <Image src={item.prd_image} width={120} />
      </div>

      <div style={{ padding: 8, textAlign: "left" }}>
        <div className="wrap-text">
          <b>
            <Trans>Batch ID</Trans>: {item.pbth_code}
          </b>
        </div>
        <div className="wrap-text">
          <small>
            <Trans>Product Name</Trans>: {item.pbth_prd_name}{" "}
          </small>
        </div>
        <div className="wrap-text">
          <small>
            <Trans>Product ID</Trans>: {item.pbth_prd_code}{" "}
          </small>
        </div>
        <div className="wrap-text">
          <small>
            <Trans>Manufactured Date</Trans>:
            {dayjs(item.pbth_manufactured_date).format("DD/MM/YYYY")}{" "}
          </small>
        </div>
        <div className="wrap-text">
          <small>
            <Trans>Expiry Date</Trans>:{" "}
            {dayjs(item.pbth_expiry_date).format("DD/MM/YYYY")}{" "}
          </small>
        </div>
      </div>
    </IonCard>
  );
};

export default ProductBatchBox;
