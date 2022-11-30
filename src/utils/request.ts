import axios from "axios";
import { environment } from "environment/environment";
import { useEffect, useState } from "react";
// Set config defaults when creating the instance

export const request = axios.create({
  baseURL: environment.baseUrl,
});

export const useTestRequest = () => {
  const [res, setRes] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://pokeapi.co/api/v2");
      setRes(data);
    })();
  }, []);

  return res;
};
