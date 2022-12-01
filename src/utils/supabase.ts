import { Photo } from "@capacitor/camera";
import { createClient } from "@supabase/supabase-js";
import { environment } from "environment/environment";
const { supabaseUrl, supabaseAnonKey, fileLimit } = environment;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export enum FilePath {
  PRODUCT = "/products",
  AVATAR = "/avatars",
}

export const uploadFile = async (filepath: FilePath, filebody: Photo) => {
  if (filebody.webPath) {
    const fileExt = filebody.format;
    const filename = `${Math.random()}.${fileExt}`;

    const res = await fetch(filebody.webPath);
    const blob = await res.blob();
    if (blob.size > fileLimit) {
      throw new Error("File size exceeded");
    }
    const result = await supabase.storage
      .from("img")
      .upload(`${filepath}/${filename}`, blob);
    console.log(result);
    return result;
  }
};
