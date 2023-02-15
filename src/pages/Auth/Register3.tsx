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
import { Trans } from "@lingui/macro";
import OtpInput from "components/OtpInput";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { usePopUpMessage } from "hooks/notification";
import { useState } from "react";
import { useHistory } from "react-router";

const Register3: React.FC = () => {
  const history = useHistory();
  const popUpMsg = usePopUpMessage();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });
  const [code, setCode] = useState("");
  return (
    <IonPage>
      <Toolbar defaultHref="/login" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow className="ion-justify-content-center">
                <h1>
                  <b>
                    <Trans>Registration</Trans>
                  </b>
                </h1>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-margin">
                <IonIcon
                  className="ion-margin"
                  src="/assets/icon/mail.svg"
                  style={{ fontSize: 220 }}
                />
                <IonNote class="ion-text-center">
                  <Trans>
                    An OTP has been sent to your email. Please verify it.
                  </Trans>
                </IonNote>
              </IonRow>
              <OtpInput
                value={code}
                valueLength={5}
                onChange={(e) => setCode(e)}
              />
              <IonRow className="ion-justify-content-center ion-margin">
                <IonNote class="ion-text-center">
                  <small>
                    <Trans>Didn’t Receive OTP?. </Trans>
                    <IonText
                      onClick={() => console.log("resend")}
                      color="secondary"
                    >
                      <Trans>Resend OTP</Trans>
                    </IonText>
                  </small>
                </IonNote>
              </IonRow>
            </div>
            <div
              style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
            >
              <IonButton
                expand="block"
                disabled={parseInt(code).toString().length < 5}
                className="text-white"
                style={{ marginTop: "auto" }}
                onClick={() => {
                  popUpMsg(
                    "Congratulation. The verification is a success. You will be redirected to the home screen.",
                    "success",
                    "Email Verification Successful!"
                  );
                  history.push("/login");
                }}
              >
                <Trans>Confirm</Trans>
              </IonButton>
            </div>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register3;
