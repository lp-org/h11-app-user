import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import { Fragment, useMemo } from "react";

interface NutritionFactsProps {
  json: any | null;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({ json }) => {
  const result = useMemo(() => {
    if (json && typeof json === "string") {
      return JSON.parse(json);
    }
    return json;
  }, [json]);

  if (!result?.[t({ id: "Nutrition_Facts" })]) return <></>;

  return (
    <Fragment>
      <IonGrid
        style={{ border: "solid 1px", maxWidth: "300px", margin: "auto" }}
        className="ion-grid-padding-xs"
      >
        <IonRow>
          <IonCol className="ion-text-center" style={{ padding: 0 }}>
            <b>
              <Trans>Nutrition Facts</Trans>
            </b>
          </IonCol>
        </IonRow>
        {Object.entries(result[t({ id: "Nutrition_Facts" })]).map(([key]) => (
          <IonRow key={key}>
            <IonCol size="12" style={{ padding: 0 }}>
              <small>
                {typeof result[t({ id: "Nutrition_Facts" })][key] ===
                "string" ? (
                  `${key.replace(/_/g, " ")}
                : ${result[t({ id: "Nutrition_Facts" })][key]}`
                ) : (
                  <></>
                )}
              </small>
            </IonCol>
          </IonRow>
        ))}
        <hr style={{ border: "solid 4px", height: 0 }} />
        <IonRow className="ion-justify-content-end">
          <small>
            <b>
              % <Trans>Daily Value</Trans>*
            </b>
          </small>
        </IonRow>
        <hr style={{ border: "solid 1px", height: 0, margin: 1 }} />
        {result?.[t({ id: "Nutrition_Facts" })]?.[t({ id: "Serving" })] &&
          Object.entries(
            result?.[t({ id: "Nutrition_Facts" })]?.[t({ id: "Serving" })]
          )?.map(([key]) => (
            <IonRow key={key}>
              <IonCol size="12" style={{ padding: 0 }}>
                {(function () {
                  if (
                    typeof result[t({ id: "Nutrition_Facts" })][
                      t({ id: "Serving" })
                    ][key] === "object"
                  ) {
                    return (
                      <Fragment>
                        <div style={{ display: "flex" }}>
                          <small>
                            <b>{key.replace(/_/g, " ")}</b>
                          </small>

                          <small style={{ marginLeft: "10px" }}>
                            {
                              result[t({ id: "Nutrition_Facts" })][
                                t({ id: "Serving" })
                              ][key].Size
                            }
                          </small>
                          <small style={{ marginLeft: "auto" }}>
                            {
                              result[t({ id: "Nutrition_Facts" })][
                                t({ id: "Serving" })
                              ][key].Daily_Value
                            }
                          </small>
                        </div>
                        <hr
                          style={{
                            border: "solid 1px",
                            height: 0,
                            margin: 1,
                          }}
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
