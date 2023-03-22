import { Photo } from "@capacitor/camera";
import { t } from "@lingui/macro";
import { environment } from "environment/environment";
import { AddProductProps, Product } from "types/product";

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
    prd_nutrition_json: translateKeys(
      JSON.stringify({
        [t({ id: "Nutrition_Facts" })]: {
          ...payload.prd_nutrition_json,
          Serving,
        },
      })
    ),
  };

  return result;
}

export function processNutritionInfoToInputData(
  payload: Product
): AddProductProps | undefined {
  if (!payload.prd_nutrition_json) {
    return undefined;
  }

  let nutritionInfoJson = payload.prd_nutrition_json;
  if (typeof payload.prd_nutrition_json === "string") {
    nutritionInfoJson = JSON.parse(payload.prd_nutrition_json);
  }

  const nutritionInfo = nutritionInfoJson?.[t({ id: "Nutrition_Facts" })];

  if (nutritionInfo) {
    const input = {
      ...nutritionInfo,
      Serving: Object.entries(nutritionInfo?.[t({ id: "Serving" })]).map(
        ([key]) => {
          const Size = parseFloat(
            nutritionInfo?.[t({ id: "Serving" })][key]?.[t({ id: "Size" })]
          );
          const unit = nutritionInfo?.[t({ id: "Serving" })][key]?.[
            t({ id: "Size" })
          ].replace(Size, "");
          const Daily_Value = parseFloat(
            nutritionInfo?.[t({ id: "Serving" })][key]?.[
              t({ id: "Daily_Value" })
            ]
          );
          return {
            Nutrition_type: key.replace(/_/g, " "),
            Size,
            unit,
            Daily_Value,
          };
        }
      ),
    };
    return input;
  }
  return {
    ...nutritionInfo,
    Serving: [
      {
        Nutrition_type: "",
        Size: "",
        unit: "",
        Daily_Value: "",
      },
    ],
  };
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

function translateKeys(jsonString: string) {
  const translatedJson: any = {};

  // Parse the JSON string to an object
  if (!jsonString) return;
  const parsedJson = JSON.parse(jsonString);

  // Iterate through each key-value pair in the object
  for (const key in parsedJson) {
    let value = parsedJson[key];

    // Check if the value is an object and recursively translate its keys
    if (typeof value === "object") {
      value = translateKeys(JSON.stringify(value));
    }

    // Translate the key to the target language
    const translatedKey = t({ id: key });

    // Add the translated key and the original or translated value to the new object
    translatedJson[translatedKey] = value;
  }

  // Return the translated object as a JSON string

  return translatedJson;
}
