import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";

import { FC, Fragment } from "react";
import { useHistory } from "react-router";

const Register2: React.FC = () => {
  const history = useHistory();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow className="ion-justify-content-center">
                <h1>
                  <b>Registration</b>
                </h1>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-margin">
                <IonIcon
                  className="ion-margin"
                  src="/assets/icon/lock.svg"
                  style={{ fontSize: 220 }}
                ></IonIcon>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked">New Password</IonLabel>
                    <IonInput
                      className="custom"
                      name="current_password"
                      placeholder="Please enter your password"
                      onIonChange={formik.handleChange}
                    ></IonInput>
                    <IonNote slot="helper">
                      Password must be at least contain 8 characters.
                    </IonNote>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem
                    lines="none"
                    className="ion-no-padding ion-margin-bottom"
                  >
                    <IonLabel position="stacked">Confirm Password</IonLabel>
                    <IonInput
                      className="custom"
                      name="current_password"
                      placeholder="Please confirm your password"
                      onIonChange={formik.handleChange}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            </div>
            <div
              style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
            >
              <IonButton
                expand="block"
                className="text-white"
                style={{ marginTop: "auto" }}
                onClick={() => history.push("/register3")}
              >
                Next
              </IonButton>
            </div>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register2;
