import { AddProductProps } from "types/product";

export function processNutritionInfoPayload(
  payload: AddProductProps
): AddProductProps {
  const Serving = {} as any;
  if (payload.prd_nutrition_json.Serving)
    payload.prd_nutrition_json.Serving.forEach((el: any) => {
      Serving[el.Nutrition_type] = {
        Size: el.Size + el.unit,
        Daily_Value: el.Daily_Value + "%",
      };
    });

  const result: AddProductProps = {
    ...payload,
    prd_nutrition_json: JSON.stringify({
      Nutrition_Facts: { ...payload.prd_nutrition_json, Serving },
    }),
  };

  return result;
}

export function processNutritionInfoToInputData(
  payload: any
): AddProductProps | undefined {
  if (!payload.prd_nutrition_json) {
    return undefined;
  }

  const nutritionInfo = payload.prd_nutrition_json.Nutrition_Facts;

  const input = {
    ...nutritionInfo,
    Serving: Object.entries(nutritionInfo.Serving).map(([key]) => ({
      Nutrition_type: key,
      Size: nutritionInfo.Serving[key].Size,
      unit: "g",
      Daily_Value: nutritionInfo.Serving[key].Daily_Value,
    })),
  };
  return input;
}

export function processNutritionInfoToInputDataFromCache(
  payload: AddProductProps
): AddProductProps | undefined {
  if (!payload.prd_nutrition_json) {
    return undefined;
  }

  const nutritionInfo = payload.prd_nutrition_json.Nutrition_Facts;
  console.log(nutritionInfo.Serving);
  const input = {
    ...nutritionInfo,
    Serving: Object.entries(nutritionInfo.Serving).map(([key]) => {
      console.log(key);
      return {
        Nutrition_type: key,
        Size: nutritionInfo.Serving[key].Size,
        unit: "g",
        Daily_Value: nutritionInfo.Serving[key].Daily_Value,
      };
    }),
  };
  return input;
}
