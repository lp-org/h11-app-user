import { Photo } from "@capacitor/camera";
import { environment } from "environment/environment";
import { AddProductProps } from "types/product";

export function processNutritionInfoPayload(
  payload: AddProductProps
): AddProductProps {
  const Serving = {} as any;
  if (payload.prd_nutrition_json?.Serving)
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
    Serving: Object.entries(nutritionInfo.Serving).map(([key]) => {
      const Size = parseFloat(nutritionInfo.Serving[key].Size);
      const unit = nutritionInfo.Serving[key].Size.replace(Size, "");
      const Daily_Value = parseFloat(nutritionInfo.Serving[key].Daily_Value);
      return {
        Nutrition_type: key.replace(/_/g, " "),
        Size,
        unit,
        Daily_Value,
      };
    }),
  };
  return input;
}

export async function checkFile(image: Photo) {
  const allowFormat = ["image/png", "image/jpeg"];
  const { fileLimit } = environment;
  var imageUrl = image.webPath;

  if (imageUrl) {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    if (!allowFormat.includes(blob.type)) {
      throw new Error(`Only ${allowFormat} are allowed`);
    }
    if (blob.size > fileLimit) {
      throw new Error("File size exceeded");
    }
    return blob;
  }
}
