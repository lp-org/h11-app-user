import { IonContent, IonIcon, IonItem, IonPage } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import Toolbar from "components/Toolbar.tsx";

import { useGetProductById } from "hooks/useProduct";

import { useHistory, useRouteMatch } from "react-router";

interface paramsProps {
  code: string;
}

const ViewProduct: React.FC = () => {
  const match = useRouteMatch<paramsProps>();
  const history = useHistory();
  const { code } = match.params;

  const { data } = useGetProductById(code);
  return (
    <IonPage>
      <Toolbar title="View Product" defaultHref="/product" />

      <IonContent fullscreen className="ion-padding">
        <IonItem lines="none">
          <b>{data?.prd_name}</b>
          <div style={{ marginLeft: "auto" }}>
            <IonIcon
              onClick={() => history.push(`/product/edit/${data?.prd_code}`)}
              src="assets/icon/edit.svg"
              size="default"
            />
          </div>
        </IonItem>
        <ShowProduct item={data!} />
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
