import { IonLoading } from "@ionic/react";
import { t } from "@lingui/macro";

import { Fragment, useCallback } from "react";
import { useAppState } from "store";

const Loading: React.FC = () => {
  const loading = useAppState((state) => state.loading);
  const setLoading = useAppState((state) => state.setLoading);

  useCallback(() => {
    setLoading(loading);
  }, [loading, setLoading]);
  return (
    <Fragment>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={t({ id: "Please wait..." })}
        duration={5000}
      />
    </Fragment>
  );
};

export default Loading;
