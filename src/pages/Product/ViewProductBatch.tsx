import { IonContent, IonItem, IonPage } from "@ionic/react";
import { t } from "@lingui/macro";

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
      <Toolbar
        title={t({ id: "View Product Batch" })}
        defaultHref="/productBatch"
      />

      <IonContent fullscreen className="ion-padding">
        <ShowProductBatch item={data!} />
      </IonContent>
    </IonPage>
  );
};

export default ViewProductBatch;
