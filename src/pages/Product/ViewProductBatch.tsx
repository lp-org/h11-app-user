import { IonContent, IonItem, IonPage } from "@ionic/react";

import ShowProductBatch from "components/ShowProductBatch";
import Toolbar from "components/Toolbar.tsx";
import { useGetProductBatchById } from "hooks/useProductBatch";

import { useRouteMatch } from "react-router";

interface paramsProps {
  code: string;
}

const ViewProductBatch: React.FC = () => {
  const match = useRouteMatch<paramsProps>();

  const { code } = match.params;

  const { data } = useGetProductBatchById(code);
  return (
    <IonPage>
      <Toolbar title="View Product" defaultHref="/productBatch" />

      <IonContent fullscreen className="ion-padding">
        <IonItem lines="none">
          <b>{data?.pbth_code}</b>
        </IonItem>
        <ShowProductBatch item={data!} />
      </IonContent>
    </IonPage>
  );
};

export default ViewProductBatch;
