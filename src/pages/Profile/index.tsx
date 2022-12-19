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
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { checkmark, cloudUpload, pencil, personCircle } from "ionicons/icons";
import { FC, Fragment, useState } from "react";

import { useAuthStore } from "store/useAuthStore";

const Profile: React.FC = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar title="My Profile" defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <IonRow className="ion-justify-content-center">
                <IonIcon
                  icon={personCircle}
                  color="gray"
                  style={{ fontSize: 100 }}
                />
                <IonCol size="12" className="ion-text-center">
                  <IonButton fill="outline" color={"dark"}>
                    <IonIcon icon={cloudUpload} slot="start" />
                    Upload Profile Photo
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonCol size="12">
                <EditableInput label="First Name" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Last Name" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Email Address" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Mobile Number" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Company Name" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Company Address" />
              </IonCol>

              <IonCol size="12">
                <EditableInput label="Password" />
              </IonCol>
            </form>
          </IonRow>
          <IonButton
            onClick={() => {
              removeToken();
            }}
          >
            Sign Out
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

interface EditableInputProps {
  label: string;
}

const EditableInput: FC<EditableInputProps> = ({ label }) => {
  return (
    <Fragment>
      <IonItem lines="none" className="ion-no-padding">
        <IonLabel position="stacked">{label}</IonLabel>

        <IonInput name={label} className="custom"></IonInput>
      </IonItem>
    </Fragment>
  );
};

export default Profile;
