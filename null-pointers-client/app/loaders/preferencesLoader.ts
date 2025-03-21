import { json, LoaderFunction } from "@remix-run/node";
import { fetchPreferenciasData } from "~/services/preferenceService";

export const preferencesLoader: LoaderFunction = async () => {
  const preferenciasData = await fetchPreferenciasData();
  return json(preferenciasData);
};
