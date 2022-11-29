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
import { useFormik } from "formik";
import { useGetProductById } from "hooks/useProduct";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store";
import { processNutritionInfoToInputData } from "utils";
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
  const dispatchProductEdit = useProductWithoutLsStore(
    (state) => state.setTempProductEdit
  );
  // const [initialValues, setInitialValues] = useState(templatePayload);
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;

  const { data } = useGetProductById(code);

  const formik = useFormik<any>({
    initialValues: data?.prd_nutrition_json
      ? processNutritionInfoToInputData(data)
      : templatePayload,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatchProductEdit({ ...tempProductEdit!, prd_nutrition_json: values! });

      history.push(`/product/edit-3/${code}`);
    },
  });

  return (
    <SetupProduct>
      <IonRow>
        {formik.values && (
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            {Object.entries(formik.values).map(([key], i) => (
              <Fragment key={i}>
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
              <Fragment key={index}>
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
