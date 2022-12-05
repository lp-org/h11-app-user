import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { checkmark, cloudUpload, pencil, personCircle } from "ionicons/icons";
import { FC, Fragment, useState } from "react";

const Register: React.FC = () => {
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });
  return (
    <IonPage>
      <Toolbar title="Registration" defaultHref="/" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12">
                  <IonLabel>First Name</IonLabel>
                  <IonItem fill="outline">
                    <IonInput placeholder="Email"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel>Last Name</IonLabel>
                  <IonItem fill="outline">
                    <IonInput placeholder="Email"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel>Email Address</IonLabel>
                  <IonItem fill="outline">
                    <IonInput placeholder="Email"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel>Mobile Number</IonLabel>
                  <IonItem fill="outline">
                    <IonInput placeholder="Email"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel>Company Name</IonLabel>
                  <IonItem fill="outline">
                    <IonInput placeholder="Email"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel>Company Address</IonLabel>
                  <IonItem fill="outline">
                    <IonText placeholder="Email"></IonText>
                  </IonItem>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  {" "}
                  <IonButton shape="round"> Next</IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
