import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
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
              <IonRow>
                <IonCol size="6">
                  <EditableInput label="First Name" />
                </IonCol>

                <IonCol size="6">
                  <EditableInput label="Last Name" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label="Email Address"
                    placeholder="Please enter your email address"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label="Mobile Number"
                    placeholder="Please enter your phone number"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label="Company Name"
                    placeholder="Please enter your company name"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput
                    label="Company Address"
                    placeholder="Please enter your company address"
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
              Next
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
