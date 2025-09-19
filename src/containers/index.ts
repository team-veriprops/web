import { ServerStore } from "@stores/server-store";import { AxiosHttpClient, HttpClient } from "@lib/http-client";
import { config } from "@lib/config";

const baseURL = config.apiUrl;
export const httpClient: HttpClient = new AxiosHttpClient(baseURL)

export const serverStore: ServerStore = new ServerStore()
export const microsoftClarityProjectId = config.microsoftClarityProjectId
export const authRequiredPathParamKey = "auth-required"
export const authRequiredTypePathParamKey = "auth-type"
