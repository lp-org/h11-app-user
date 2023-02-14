import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import I18Switcher from "components/i18n/I18Switcher";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import {
  chevronForward,
  cloudUpload,
  createOutline,
  personCircle,
} from "ionicons/icons";
import { FC, Fragment } from "react";
import { useHistory } from "react-router";

import { useAuthStore } from "store/useAuthStore";

const Profile: React.FC = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const history = useHistory();
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar title={t({ id: "My Profile" })} defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <IonRow className="ion-justify-content-center">
              <IonIcon
                icon={personCircle}
                color="gray"
                style={{ fontSize: 100 }}
              />
              <IonCol size="12" className="ion-text-center">
                <IonButton fill="outline" color="dark">
                  <IonIcon icon={cloudUpload} slot="start" />
                  <Trans>Upload Profile Photo</Trans>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem class="ion-no-padding" lines="none">
                  <b>
                    <Trans>Profile</Trans>
                  </b>
                  <IonIcon
                    onClick={() => history.push("/editProfile")}
                    icon={createOutline}
                    slot="end"
                    color="primary"
                  ></IonIcon>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="First Name" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="Last Name" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="Email Address" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="Mobile Number" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="Company Name" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <EditableInput label="Company Address" />
              </IonCol>
            </IonRow>
          </form>
          <IonRow>
            <IonCol size="12">
              <IonItem class="ion-no-padding" lines="none">
                <b>
                  <Trans>Password</Trans>
                </b>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem
                className="ion-no-padding"
                onClick={() => history.push("/changePassword")}
              >
                <IonLabel
                  position="fixed"
                  style={{ width: "unset", flex: "0 0 auto" }}
                >
                  <Trans>Change Password</Trans>
                </IonLabel>
                <IonIcon icon={chevronForward} slot="end" size="small" />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonButton
            expand="block"
            className="text-white"
            onClick={() => {
              removeToken();
            }}
          >
            <Trans>Sign Out</Trans>
          </IonButton>
          <I18Switcher />
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
      <IonItem className="ion-no-padding">
        <IonLabel position="fixed" style={{ width: "unset", flex: "0 0 auto" }}>
          {label}
        </IonLabel>
        <div slot="end">xxxxxxx</div>
      </IonItem>
    </Fragment>
  );
};

export default Profile;
