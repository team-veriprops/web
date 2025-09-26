import { ServerStore } from "@stores/server-store";
import { config } from "@lib/config";
import { PropertyType } from "@components/website/property/models";
import { FetchHttpClient, HttpClient } from "@lib/FetchHttpClient";

const baseURL = config.apiUrl;
export const httpClient: HttpClient = new FetchHttpClient(baseURL);

export const serverStore: ServerStore = new ServerStore();
export const microsoftClarityProjectId = config.microsoftClarityProjectId;
export const authRequiredPathParamKey = "auth-required";
export const authRequiredTypePathParamKey = "auth-type";

export const productsTableTabs: Array<{value: PropertyType, label: string}> = [
  { value: PropertyType.LAND, label: "Lands" },
  { value: PropertyType.HOUSE, label: "Houses" },
  { value: PropertyType.SERVICE, label: "Services" },
] as const;
