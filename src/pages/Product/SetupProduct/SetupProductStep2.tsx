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
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment, useEffect } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";

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
      history.push("/product/add-3");
    },
  });
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
      <Toolbar title="Setup Product" defaultHref="/product" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Nutrition Facts ( 2 of 2 )</b>
          </div>

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
                                className="ion-margin-bottom"
                              >
                                <IonInput
                                  required
                                  name={`${key}[${index}]["Nutrition_type"]`}
                                  onIonChange={formik.handleChange}
                                  value={
                                    formik.values[key][index]["Nutrition_type"]
                                  }
                                ></IonInput>
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
