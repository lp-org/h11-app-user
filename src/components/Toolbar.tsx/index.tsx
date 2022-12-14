import {
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonHeader,
} from "@ionic/react";
import { Fragment } from "react";
// import { useHistory } from "react-router";

interface ToolbarProps {
  title?: string;
  defaultHref?: string;
  action?: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, defaultHref, action }) => {
  //   const history = useHistory();
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref={defaultHref}
            text=""
            style={{ color: "black" }}
          />
        </IonButtons>

        <IonButtons slot="end">{action}</IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
