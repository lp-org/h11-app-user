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
} from "@ionic/react";
import { FormikProps, useFormik } from "formik";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment, useState } from "react";
import { useHistory } from "react-router";
import { AddProductProps } from "types/product";
import SetupProduct from ".";

interface SetupProductStep2Props {
  formik: FormikProps<AddProductProps>;
  setStep: (step: number) => void;
}

const templatePayload = {
  Serving_Size: "",
  "Amount_Per_Serving_(Calories)": "",
  Serving: [
    {
      Nutrition_type: "",
      Size: "",
      Daily_Value: "",
    },
  ],
};

const SetupProductStep2: FC<SetupProductStep2Props> = () => {
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(templatePayload);
  const formik = useFormik<any>({
    initialValues: { ...initialValues },
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <SetupProduct>
      <IonRow>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          {Object.entries(formik.values).map(([key]) => (
            <Fragment>
              {key !== "Serving" ? (
                <IonCol size="12">
                  <IonLabel position="floating" className="required ">
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
                  {formik.values[key].map((servingVal: any, index: number) => (
                    <Fragment>
                      <hr />
                      <IonCol size="12">
                        <IonLabel position="floating">
                          <IonRow>
                            <div className="required">
                              Nutrition Fact Type {index + 1}:
                            </div>
                            <IonIcon
                              style={{
                                marginLeft: "auto",
                                fontSize: "1.2rem",
                              }}
                              icon={removeCircle}
                              color="gray"
                              onClick={() =>
                                setInitialValues(() => {
                                  formik.values.Serving.splice(index, 1);

                                  // return prev;
                                  return {
                                    ...formik.values,
                                    Serving: [...formik.values.Serving],
                                  };
                                })
                              }
                            />
                          </IonRow>
                        </IonLabel>

                        <IonItem fill="outline" className="ion-margin-bottom">
                          <IonInput
                            required
                            name={`${key}[${index}]["Nutrition_type"]`}
                            onIonChange={formik.handleChange}
                            value={formik.values[key][index]["Nutrition_type"]}
                          ></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12">
                        <IonLabel position="floating" className="required">
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
                            <IonSelect value={"g"}>
                              <IonSelectOption value="g">g</IonSelectOption>
                              <IonSelectOption value="mg">mg</IonSelectOption>
                            </IonSelect>
                          </IonItem>

                          <IonInput
                            required
                            placeholder="Daily Value"
                            type="number"
                            name={`${key}[${index}]["Daily_Value"]`}
                            onIonChange={formik.handleChange}
                            value={formik.values[key][index]["Daily_Value"]}
                            style={{ marginLeft: 14 }}
                          ></IonInput>

                          <IonItem color={"gray"} style={{ height: "100%" }}>
                            <span style={{ paddingRight: 14 }}> % </span>
                          </IonItem>
                        </IonItem>
                      </IonCol>
                      <hr />
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
          ))}

          <IonButton
            expand="block"
            color="light"
            class="ion-margin-top add-row-button"
            onClick={() =>
              setInitialValues((prev) => ({
                ...formik.values,
                Serving: [
                  ...formik.values.Serving,
                  {
                    Nutrition_type: "",
                    Size: "",
                    Daily_Value: "",
                  },
                ],
              }))
            }
          >
            Add Row
          </IonButton>
          <IonButton type="submit" expand="block" class="ion-margin-top">
            Preview
          </IonButton>
        </form>
      </IonRow>
    </SetupProduct>
  );
};

export default SetupProductStep2;
