import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Fragment, useMemo } from "react";

interface NutritionFactsProps {
  json: any | null;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({ json }) => {
  const result = useMemo(() => {
    if (typeof json === "string") return JSON.parse(json);
    return json;
  }, [json]);

  if (!result?.Nutrition_Facts) return <></>;

  return (
    <Fragment>
      <IonGrid style={{ border: "solid 1px" }} className="ion-grid-padding-xs">
        <IonRow>
          <IonCol className="ion-text-center" style={{ padding: 0 }}>
            <b>Nutrition Facts</b>
          </IonCol>
        </IonRow>
        {Object.entries(result.Nutrition_Facts).map(([key]) => (
          <IonRow>
            <IonCol size="12" style={{ padding: 0 }}>
              <small>
                {typeof result.Nutrition_Facts[key] === "string" ? (
                  `${key.replace(/_/g, " ")}
                : ${result.Nutrition_Facts[key]}`
                ) : (
                  <></>
                )}
              </small>
            </IonCol>
          </IonRow>
        ))}
        <hr style={{ border: "solid 5px", height: 0 }} />
        <IonRow className="ion-justify-content-end">
          <small>
            <b>% Daily Value*</b>
          </small>
        </IonRow>
        <hr style={{ border: "solid 1px", height: 0, margin: 1 }} />
        {Object.entries(result?.Nutrition_Facts?.Serving).map(([key]) => (
          <IonRow>
            <IonCol size="12" style={{ padding: 0 }}>
              {(function () {
                if (typeof result.Nutrition_Facts.Serving[key] === "object") {
                  return (
                    <Fragment>
                      <div style={{ display: "flex" }}>
                        <small>
                          <b>{key.replace(/_/g, " ")}</b>
                        </small>

                        <small style={{ marginLeft: "10px" }}>
                          {result.Nutrition_Facts.Serving[key].Size}
                        </small>
                        <small style={{ marginLeft: "auto" }}>
                          {result.Nutrition_Facts.Serving[key].Daily_Value}
                        </small>
                      </div>
                      <hr
                        style={{ border: "solid 1px", height: 0, margin: 1 }}
                      />
                    </Fragment>
                  );
                }
              })()}
            </IonCol>
          </IonRow>
        ))}
        <IonRow></IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default NutritionFacts;
