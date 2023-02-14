import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import { useFormik } from "formik";
import { useLogin } from "hooks/useAuth";
import { Link } from "react-router-dom";
import { AuthLogin } from "types/auth";

const Login: React.FC = () => {
  const login = useLogin();
  const formik = useFormik<AuthLogin>({
    initialValues: {
      username: "admin",
      password: "password",
      apptype: "MERCHANT",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      login.mutate(values);
    },
  });
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonGrid
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <IonRow style={{ flex: "0 1 auto" }}>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <IonRow
                className="ion-justify-content-center"
                style={{ marginTop: 100 }}
              >
                <IonIcon
                  src="/assets/icon/logo.svg"
                  style={{ fontSize: 200 }}
                />
                <IonCol size="12" className="ion-text-center">
                  <h1>
                    <b>
                      <Trans>Login Now</Trans>
                    </b>
                  </h1>
                  <h6>
                    <Trans>Please sign in to continue.</Trans>
                  </h6>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked"></IonLabel>
                    <IonInput
                      className="custom"
                      value={formik.values.username}
                      onIonChange={formik.handleChange}
                      name="username"
                      required
                      placeholder={t({ id: `Email Address` })}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked"></IonLabel>
                    <IonInput
                      className="custom"
                      value={formik.values.password}
                      onIonChange={formik.handleChange}
                      name="password"
                      type="password"
                      required
                      placeholder={t({ id: `Password` })}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12" className="ion-text-end">
                  <Link to="/register" className="ion-margin-start">
                    <small>
                      <Trans>Forgot Password?</Trans>
                    </small>
                  </Link>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonButton
                    type="submit"
                    expand="block"
                    className="text-white"
                  >
                    <Trans>Login</Trans>
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonRow>
          <IonRow
            style={{ flex: "1 1 auto" }}
            className="ion-justify-content-center"
          >
            <IonItem lines="none" style={{ marginTop: "auto", fontSize: 14 }}>
              <Trans>Don’t have an account? </Trans>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "#00A3FF",
                }}
              >
                <Trans>Sign Up</Trans>
              </Link>
            </IonItem>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
