import {
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonHeader,
} from "@ionic/react";
// import { useHistory } from "react-router";

interface ToolbarProps {
  title?: string;
  defaultHref?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, defaultHref }) => {
  //   const history = useHistory();
  return (
    <IonHeader translucent>
      <IonToolbar color={"primary"}>
        <IonButtons slot="start">
          <IonBackButton defaultHref={defaultHref} text="" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
