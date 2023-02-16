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
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";

import { FC, Fragment } from "react";
import { useHistory } from "react-router";

const Register: React.FC = () => {
  const history = useHistory();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar
        defaultHref="/"
        action={
          <IonIcon
            src="/assets/icon/language.svg"
            onClick={() =>
              history.push("/updateLanguage", { from: "/register" })
            }
          />
        }
      />

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
              <IonRow>
                <IonCol size="6">
                  <EditableInput label={t({ id: "First Name" })} />
                </IonCol>

                <IonCol size="6">
                  <EditableInput label={t({ id: "Family Name" })} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label={t({ id: "Email Address" })}
                    placeholder={t({ id: "Please enter your email address" })}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label={t({ id: "Mobile Number" })}
                    placeholder={t({ id: "Please enter your phone number" })}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label={t({ id: "Company Name" })}
                    placeholder={t({ id: "Please enter your company name" })}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label={t({ id: "Company Address" })}
                    placeholder={t({ id: "Please enter your company address" })}
                  />
                </IonCol>
              </IonRow>
            </div>

            <IonButton
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
              onClick={() => history.push("/register2")}
            >
              <Trans>Next</Trans>
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

interface EditableInputProps {
  label: string;
  placeholder?: string;
}

const EditableInput: FC<EditableInputProps> = ({ label, placeholder }) => {
  return (
    <Fragment>
      <IonItem lines="none" className="ion-no-padding">
        <IonLabel position="stacked">{label}</IonLabel>

        <IonInput
          name={label}
          className="custom"
          placeholder={placeholder || label}
        ></IonInput>
      </IonItem>
    </Fragment>
  );
};

export default Register;
