import { IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import React from "react";
import { useAppState } from "store";
import { LocaleEnum } from "types/i18n";

const I18Switcher = () => {
  const locale = useAppState((state) => state.locale);
  const setLocale = useAppState((state) => state.setLocale);
  return (
    <div>
      <IonSelect
        placeholder="Select fruit"
        value={locale}
        onIonChange={(e) => setLocale(e.target.value)}
      >
        <IonSelectOption value={LocaleEnum.English}>English</IonSelectOption>
        <IonSelectOption value={LocaleEnum.Malay}>
          Bahasa Melayu
        </IonSelectOption>
      </IonSelect>
    </div>
  );
};

export default I18Switcher;
