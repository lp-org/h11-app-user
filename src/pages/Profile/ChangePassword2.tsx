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
import { useHistory } from "react-router";

const ChangePassword2: React.FC = () => {
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
                <IonCol size="12">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked">
                      <Trans>New Password</Trans>
                    </IonLabel>
                    <IonInput
                      className="custom"
                      name="current_password"
                      placeholder={t({ id: "Please enter your password" })}
                      onIonChange={formik.handleChange}
                    ></IonInput>
                    <IonNote slot="helper">
                      <Trans>
                        Password must be at least contain 8 characters.
                      </Trans>
                    </IonNote>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked">
                      <Trans>Confirm Password</Trans>
                    </IonLabel>
                    <IonInput
                      className="custom"
                      name="current_password"
                      placeholder={t({ id: "Please confirm your password" })}
                      onIonChange={formik.handleChange}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            </div>

            <IonButton
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
              onClick={() => history.push("/changePassword3")}
            >
              <Trans>Next</Trans>
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword2;
