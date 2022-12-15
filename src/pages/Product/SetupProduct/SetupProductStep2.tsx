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
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import SteupSteppers from "./SteupSteppers";

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

const SetupProductStep2: FC = () => {
  const history = useHistory();
  const tempProductSetup = useProductStore((state) => state.tempProductSetup);

  const formik = useFormik<any>({
    initialValues: tempProductSetup?.prd_nutrition_json || templatePayload,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (errorMessage()) {
        history.push("/product/add-3");
      }
    },
  });

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

  const dispatchProductSetup = useProductStore(
    (state) => state.setTempProductSetup
  );

  useEffect(() => {
    dispatchProductSetup(
      tempProductSetup
        ? {
            ...tempProductSetup,
            prd_nutrition_json: formik.values!,
          }
        : {
            prd_code: "",
            prd_category: "",
            prd_expiry_period: null,
            prd_flavour: "",
            prd_ingredients: "",
            prd_keep_it_fresh: "",
            prd_name: "",
            prd_nutrition_json: "",
            prd_storage_instructions: "",
            prd_type: "",
            prd_image: "",
          }
    );
  }, [formik.values]);

  return (
    <IonPage>
      <Toolbar
        title="Setup Product"
        defaultHref="/product"
        action={
          <IonButton onClick={() => history.push("/product")}>
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Nutrition Facts Setup </b>
          </div>
          <SteupSteppers step={2} />
          <IonRow>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              {Object.entries(formik.values).map(([key]) => (
                <Fragment>
                  {key !== "Serving" ? (
                    <IonCol size="12">
                      <IonLabel position="floating">
                        {key.replace(/_/g, " ")}:
                      </IonLabel>
                      <IonItem fill="outline" className="ion-margin-bottom">
                        <IonInput
                          required
                          name={key}
                          onIonChange={formik.handleChange}
                          value={formik.values[key]}
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  ) : (
                    <Fragment>
                      {formik.values[key].map(
                        (servingVal: any, index: number) => (
                          <Fragment>
                            <hr />
                            <IonCol size="12">
                              <IonLabel position="floating">
                                <IonRow>
                                  <div>Nutrition Fact Type {index + 1}:</div>
                                  <IonIcon
                                    style={{
                                      marginLeft: "auto",
                                      fontSize: "1.2rem",
                                    }}
                                    icon={removeCircle}
                                    color="gray"
                                    onClick={() => {
                                      formik.values.Serving.splice(index, 1);
                                      formik.setValues({
                                        ...formik.values,
                                        Serving: [...formik.values.Serving],
                                      });
                                    }}
                                  />
                                </IonRow>
                              </IonLabel>

                              <IonItem
                                fill="outline"
                                className={`ion-margin-bottom ${
                                  !errorMessage(index) && "ion-invalid"
                                }`}
                              >
                                <IonInput
                                  required
                                  name={`${key}[${index}]["Nutrition_type"]`}
                                  onIonChange={formik.handleChange}
                                  value={
                                    formik.values[key][index]["Nutrition_type"]
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
                              <IonLabel position="floating">
                                {key.replace(/_/g, " ")}:
                              </IonLabel>
                              <IonItem
                                fill="outline"
                                style={{ paddingRight: 0 }}
                                className="ion-margin-bottom"
                              >
                                <IonInput
                                  required
                                  placeholder="Amount"
                                  type="number"
                                  step="0.01"
                                  name={`${key}[${index}]["Size"]`}
                                  onIonChange={formik.handleChange}
                                  value={formik.values[key][index]["Size"]}
                                ></IonInput>
                                <IonItem color={"gray"}>
                                  <IonSelect
                                    value={formik.values[key][index].unit}
                                    name={`${key}[${index}].unit`}
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
                                  placeholder="Daily Value"
                                  type="number"
                                  name={`${key}[${index}]["Daily_Value"]`}
                                  onIonChange={formik.handleChange}
                                  value={
                                    formik.values[key][index]["Daily_Value"]
                                  }
                                  style={{ marginLeft: 14 }}
                                ></IonInput>

                                <IonItem
                                  color={"gray"}
                                  style={{ height: "100%" }}
                                >
                                  <span style={{ paddingRight: 14 }}> % </span>
                                </IonItem>
                              </IonItem>
                            </IonCol>
                            <hr />
                          </Fragment>
                        )
                      )}
                    </Fragment>
                  )}
                </Fragment>
              ))}

              <IonButton
                expand="block"
                shape="round"
                color="light"
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
                Add Row
              </IonButton>
              <IonButton
                shape="round"
                type="submit"
                expand="block"
                class="ion-margin-top"
              >
                Preview
              </IonButton>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductStep2;
