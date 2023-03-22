import axios from "axios";
import { environment } from "environment/environment";

// Set config defaults when creating the instance

export const request = axios.create({
  baseURL: environment.baseUrl,
});

export const requestV2 = axios.create({
  baseURL: `${environment.baseUrl}/v2`,
});
