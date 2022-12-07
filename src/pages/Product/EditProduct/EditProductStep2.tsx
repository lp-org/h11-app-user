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
import { useGetProductById } from "hooks/useProduct";
import { removeCircle } from "ionicons/icons";
import { FC, Fragment, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store/useProductStore";
import { processNutritionInfoToInputData } from "utils";
import { SERVING } from "utils/enum";

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
      dispatchProductEdit({ ...tempProductEdit!, prd_nutrition_json: values! });

      history.push(`/product/edit-3/${code}`);
    },
  });
  useMemo(() => {
    if (data?.prd_nutrition_json) {
      formik.setValues(processNutritionInfoToInputData(data));
    }
  }, [data]);
  console.log(data?.prd_nutrition_json);
  console.log(formik.values);
  return (
    <IonPage>
      <Toolbar title="Edit Product" defaultHref={`/product/${code}`} />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Nutrition Facts Edit ( 2 of 2 )</b>
          </div>

          <IonRow>
            {formik.values && (
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                {Object.entries(formik.values).map(([key], i) => (
                  <Fragment key={i}>
                    {key !== SERVING && (
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
                    )}
                  </Fragment>
                ))}

                {formik.values[SERVING].map(
                  (servingVal: any, index: number) => (
                    <Fragment key={index}>
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
                                console.log(index);
                                formik.values[SERVING].splice(index, 1);

                                formik.setValues({
                                  ...formik.values,
                                  Serving: [...formik.values[SERVING]],
                                });
                                console.log(formik.values);
                              }}
                            />
                          </IonRow>
                        </IonLabel>

                        <IonItem fill="outline" className="ion-margin-bottom">
                          <IonInput
                            required
                            name={`${SERVING}[${index}]["Nutrition_type"]`}
                            onIonChange={formik.handleChange}
                            value={
                              formik.values[SERVING][index]["Nutrition_type"]
                            }
                          ></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12">
                        <IonLabel position="floating">
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
                                formik.values.Serving[index].unit =
                                  e.target.value;
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
                  )
                )}

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
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProductStep2;
