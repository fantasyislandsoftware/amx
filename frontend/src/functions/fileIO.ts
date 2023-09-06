import { apiBaseUrl } from "../constants/env";

export const loadFile = async (path: string, mode: "internal" | "external") => {
  const response = await fetch(
    `${apiBaseUrl}/getFile?path=${path}&mode=${mode}`
  );
  const result = await response.json();
  return result;
};
