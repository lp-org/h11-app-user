import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonContent,
  IonGrid,
  IonPage,
  IonNote,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { useGetProductById } from "hooks/useProduct";
import { trash } from "ionicons/icons";
import { FC, Fragment, useCallback, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store/useProductStore";
import { processNutritionInfoToInputData } from "utils";
import { SERVING } from "utils/enum";
import EditSteppers from "./EditSteppers";

interface paramsProps {
  code: string;
}

const templatePayload = {
  Serving_Size: "",
  "Amount_Per_Serving_(Calories)": "",
  Serving: [
    {
      Nutrition_type: "",
      Size: "",
      unit: "g",
      Daily_Value: "",
    },
  ],
};

const EditProductStep2: FC = () => {
  const history = useHistory();
  const tempProductEdit = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );
  const dispatchProductEdit = useProductWithoutLsStore(
    (state) => state.setTempProductEdit
  );

  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;

  const { data } = useGetProductById(code);

  const formik = useFormik<any>({
    initialValues: templatePayload,
    onSubmit: (values) => {
      if (errorMessage()) {
        dispatchProductEdit({
          ...tempProductEdit!,
          prd_nutrition_json: values!,
        });

        history.push(`/product/edit-3/${code}`);
      }
    },
  });
  useMemo(() => {
    if (data?.prd_nutrition_json) {
      formik.setValues(processNutritionInfoToInputData(data));
    }
  }, [data]);
  const errorMessage = useCallback(
    (num?: number) => {
      const names: string[] = [];
      let valid = true;
      formik.values.Serving.forEach(
        (el: { Nutrition_type: string }, index: number) => {
          if (!names.includes(el.Nutrition_type)) {
            names.push(el.Nutrition_type);
          } else if (index === num) {
            valid = false;
          } else if (num === undefined) {
            valid = false;
          }
        }
      );

      return valid;
    },
    [formik.values]
  );
  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Edit Product" })}
        defaultHref={`/product/${code}`}
        action={
          <IonButton
            onClick={() => history.push(`/product/${code}`)}
            color="dark"
          >
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
          <div className="ion-margin-bottom">
            <b>
              <Trans>Nutrition Facts Setup</Trans>{" "}
            </b>
          </div>
          <EditSteppers step={2} code={code} />
          <IonGrid style={{ height: "100%", width: "100%" }}>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: "flex", flexFlow: "column", height: "100%" }}
            >
              {formik.values && (
                <Fragment>
                  <div style={{ flex: "0 1 auto" }}>
                    {Object.entries(formik.values).map(([key], i) => (
                      <IonRow>
                        {key !== SERVING && (
                          <IonCol size="12">
                            <IonItem lines="none" className="ion-no-padding">
                              <IonLabel position="stacked">
                                {key.replace(/_/g, " ")}:
                              </IonLabel>
                              <IonInput
                                className="custom"
                                required
                                name={key}
                                onIonChange={formik.handleChange}
                                value={formik.values[key]}
                              ></IonInput>
                            </IonItem>
                          </IonCol>
                        )}
                      </IonRow>
                    ))}

                    {formik.values[SERVING].map(
                      (servingVal: any, index: number) => (
                        <Fragment key={index}>
                          <hr />

                          <IonCol size="12">
                            <IonItem
                              lines="none"
                              className={`ion-no-padding ${
                                !errorMessage(index) && "ion-invalid"
                              }`}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <IonLabel position="stacked">
                                  <Trans>Nutrition Fact Type</Trans> {index + 1}
                                  :
                                </IonLabel>
                                <div style={{ marginLeft: "auto" }}>
                                  <IonIcon
                                    style={{
                                      marginLeft: "auto",
                                      fontSize: "1.2rem",
                                    }}
                                    icon={trash}
                                    color="primary"
                                    onClick={() => {
                                      formik.values.Serving.splice(index, 1);
                                      formik.setValues({
                                        ...formik.values,
                                        Serving: [...formik.values.Serving],
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <IonInput
                                required
                                className="custom"
                                name={`${SERVING}[${index}]["Nutrition_type"]`}
                                onIonChange={formik.handleChange}
                                value={
                                  formik.values[SERVING][index][
                                    "Nutrition_type"
                                  ]
                                }
                              ></IonInput>
                              <IonNote slot="error">
                                {(function () {
                                  if (!errorMessage(index)) {
                                    return "Duplicate Nutrition Type";
                                  } else {
                                    return "";
                                  }
                                })()}
                              </IonNote>
                            </IonItem>
                          </IonCol>
                          <IonCol size="12">
                            <IonItem
                              lines="none"
                              className="ion-no-padding"
                              style={{ paddingRight: 0 }}
                            >
                              <IonLabel position="stacked">
                                {SERVING.replace(/_/g, " ")}:
                              </IonLabel>
                              <IonItem
                                lines="none"
                                style={{ paddingRight: 0 }}
                                className="ion-no-padding"
                              >
                                <IonInput
                                  required
                                  className="custom-1"
                                  placeholder="0"
                                  type="number"
                                  step="0.01"
                                  style={{ height: "100%" }}
                                  name={`${SERVING}[${index}]["Size"]`}
                                  onIonChange={formik.handleChange}
                                  value={formik.values[SERVING][index]["Size"]}
                                ></IonInput>
                                <IonItem
                                  color={"light"}
                                  lines="none"
                                  style={{ marginLeft: 4 }}
                                >
                                  <IonSelect
                                    value={formik.values[SERVING][index].unit}
                                    name={`${SERVING}[${index}].unit`}
                                    onIonChange={(e) => {
                                      formik.values.Serving[index].unit =
                                        e.target.value;
                                      formik.setValues({
                                        ...formik.values,
                                        Serving: formik.values.Serving,
                                      });
                                      // formik.handleChange(e);
                                    }}
                                  >
                                    <IonSelectOption value="g">
                                      g
                                    </IonSelectOption>
                                    <IonSelectOption value="mg">
                                      mg
                                    </IonSelectOption>
                                  </IonSelect>
                                </IonItem>

                                <IonInput
                                  required
                                  className="custom-1"
                                  placeholder="0"
                                  type="number"
                                  name={`${SERVING}[${index}]["Daily_Value"]`}
                                  onIonChange={formik.handleChange}
                                  value={
                                    formik.values[SERVING][index]["Daily_Value"]
                                  }
                                  style={{ marginLeft: 14, height: "100%" }}
                                ></IonInput>

                                <IonItem
                                  color={"light"}
                                  style={{ marginLeft: 4 }}
                                  lines="none"
                                >
                                  <span style={{ paddingRight: 14 }}> % </span>
                                </IonItem>
                              </IonItem>
                            </IonItem>
                          </IonCol>

                          <hr className="solid" />
                        </Fragment>
                      )
                    )}
                    <IonButton
                      expand="block"
                      shape="round"
                      class="ion-margin-top add-row-button"
                      onClick={() =>
                        formik.setValues({
                          ...formik.values,
                          Serving: [
                            ...formik.values.Serving,
                            {
                              Nutrition_type: "",
                              Size: "",
                              Daily_Value: "",
                              unit: "g",
                            },
                          ],
                        })
                      }
                    >
                      <Trans>Add Row</Trans>
                    </IonButton>
                  </div>
                  <div
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <IonButton
                      type="submit"
                      expand="block"
                      style={{ marginTop: "auto" }}
                      class="text-white"
                    >
                      <Trans>Preview</Trans>
                    </IonButton>
                  </div>
                </Fragment>
              )}
            </form>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditProductStep2;
