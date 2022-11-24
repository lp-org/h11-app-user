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
import { useGetProductById } from "hooks";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductStore, useProductWithoutLsStore } from "store";
import { AddProductProps } from "types/product";
import {
  processNutritionInfoToInputData,
  processNutritionInfoToInputDataFromCache,
} from "utils";
import { SERVING } from "utils/enum";
import SetupProduct from ".";

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
  // const [initialValues, setInitialValues] = useState(templatePayload);
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;

  const { data } = useGetProductById(code);

  const formik = useFormik<any>({
    initialValues: tempProductEdit?.prd_code
      ? processNutritionInfoToInputDataFromCache(tempProductEdit)
      : data?.prd_nutrition_json
      ? processNutritionInfoToInputData(data)
      : templatePayload,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      history.push(`/product/edit-3/${code}`);
    },
  });
  const dispatchProductEdit = useProductWithoutLsStore(
    (state) => state.setTempProductEdit
  );
  useEffect(() => {
    dispatchProductEdit(
      tempProductEdit
        ? {
            ...tempProductEdit,
            prd_nutrition_json: { Nutrition_Facts: formik.values! },
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
          }
    );
  }, [formik.values]);
  console.log(tempProductEdit);
  return (
    <SetupProduct>
      <IonRow>
        {formik.values && (
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            {Object.entries(formik.values).map(([key]) => (
              <Fragment>
                {key !== SERVING && (
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
                )}
              </Fragment>
            ))}

            {formik.values[SERVING].map((servingVal: any, index: number) => (
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

                  <IonItem fill="outline" className="ion-margin-bottom">
                    <IonInput
                      required
                      name={`${SERVING}[${index}]["Nutrition_type"]`}
                      onIonChange={formik.handleChange}
                      value={formik.values[SERVING][index]["Nutrition_type"]}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonLabel position="floating" className="required">
                    {SERVING.replace(/_/g, " ")}:
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
                      name={`${SERVING}[${index}]["Size"]`}
                      onIonChange={formik.handleChange}
                      value={formik.values[SERVING][index]["Size"]}
                    ></IonInput>
                    <IonItem color={"gray"}>
                      <IonSelect
                        value={formik.values[SERVING][index].unit}
                        name={`${SERVING}[${index}].unit`}
                        onIonChange={(e) => {
                          formik.values.Serving[index].unit = e.target.value;
                          formik.setValues({
                            ...formik.values,
                            Serving: formik.values.Serving,
                          });
                          // formik.handleChange(e);
                        }}
                      >
                        <IonSelectOption value="g">g</IonSelectOption>
                        <IonSelectOption value="mg">mg</IonSelectOption>
                      </IonSelect>
                    </IonItem>

                    <IonInput
                      required
                      placeholder="Daily Value"
                      type="number"
                      name={`${SERVING}[${index}]["Daily_Value"]`}
                      onIonChange={formik.handleChange}
                      value={formik.values[SERVING][index]["Daily_Value"]}
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

            <IonButton
              expand="block"
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
            <IonButton type="submit" expand="block" class="ion-margin-top">
              Preview
            </IonButton>
          </form>
        )}
      </IonRow>
    </SetupProduct>
  );
};

export default EditProductStep2;
