import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { t } from "@lingui/macro";
import Toolbar from "components/Toolbar.tsx";
import { languages } from "constant";
import { checkmarkOutline } from "ionicons/icons";
import { useAppStateWithLs } from "store";

const UpdateLanguage = () => {
  const locale = useAppStateWithLs((state) => state.locale);
  const setLocale = useAppStateWithLs((state) => state.setLocale);
  return (
    <IonPage>
      <Toolbar title={t({ id: "Language" })} defaultHref="/profile" />

      <IonContent fullscreen className="ion-padding">
        <IonList>
          {languages.map(({ code, text }) => (
            <IonItem key={code} onClick={() => setLocale(code)}>
              <IonLabel>{text}</IonLabel>
              {locale === code && (
                <IonLabel slot="end">
                  <IonIcon
                    color="primary"
                    style={{ fontSize: 18, fontWeight: 700 }}
                    icon={checkmarkOutline}
                  />
                </IonLabel>
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UpdateLanguage;
