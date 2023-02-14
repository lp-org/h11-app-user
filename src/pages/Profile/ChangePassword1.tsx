import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";

import { FC, Fragment } from "react";
import { useHistory } from "react-router";

const ChangePassword1: React.FC = () => {
  const history = useHistory();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar title={t({ id: "Change Password" })} defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow>
                <IonCol size="12" class="ion-text-center">
                  <small style={{ color: "#999999" }}>
                    <Trans>
                      Keep your account safe, please verify your identity by
                      entering your password.
                    </Trans>
                  </small>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked">Current Password</IonLabel>
                    <IonInput
                      className="custom"
                      name="current_password"
                      placeholder={t({ id: "Please enter your password" })}
                      onIonChange={formik.handleChange}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-margin-top">
                <IonText color="secondary">
                  <small>
                    <Trans>Forgot Password?</Trans>
                  </small>
                </IonText>
              </IonRow>
            </div>

            <IonButton
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
              onClick={() => history.push("/changePassword2")}
            >
              Next
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword1;
