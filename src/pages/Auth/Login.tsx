import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useFormik } from "formik";
import { useLogin } from "hooks/useAuth";
import { Link } from "react-router-dom";
import { AuthLogin } from "types/auth";

const Login: React.FC = () => {
  const login = useLogin();
  const formik = useFormik<AuthLogin>({
    initialValues: {
      email: "user",
      password: "user123",
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
        <IonGrid>
          <IonRow>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <IonRow className="ion-justify-content-center">
                <IonImg src="/assets/logo.png" style={{ width: 200 }} />
                <IonCol size="12" className="ion-text-center">
                  <h1>
                    <b>Login Now</b>
                  </h1>
                  <h6>Please sign in to continue.</h6>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonItem lines="none" className="ion-no-padding">
                    <IonLabel position="stacked"></IonLabel>
                    <IonInput
                      className="custom"
                      value={formik.values.email}
                      onIonChange={formik.handleChange}
                      name="email"
                      required
                      placeholder="Email Address"
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
                      placeholder="Password"
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12" className="ion-text-end">
                  <Link to="/register" className="ion-margin-start">
                    <small>Forgot Password?</small>
                  </Link>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonButton
                    type="submit"
                    expand="block"
                    className="text-white"
                  >
                    Login
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonRow>
        </IonGrid>
        <IonItem lines="none">
          Don’t have an account?{" "}
          <Link to="/register" className="ion-margin-start">
            {" "}
            Sign Up
          </Link>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Login;
