import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonNote,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import OtpInput from "components/OtpInput";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";

const ChangePassword4: React.FC = () => {
  const history = useHistory();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar title="Complete" defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow className="ion-justify-content-center ion-margin">
                <IonIcon
                  className="ion-margin"
                  src="/assets/icon/complete.svg"
                  style={{ fontSize: 220 }}
                />
                <IonNote class="ion-text-center ion-margin">
                  Password Change Completed!!
                </IonNote>
              </IonRow>
            </div>
            <div
              style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
            >
              <IonButton
                expand="block"
                className="text-white"
                style={{ marginTop: "auto" }}
                onClick={() => history.push("/profile")}
              >
                Done
              </IonButton>
            </div>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword4;
