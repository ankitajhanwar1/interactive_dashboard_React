import { SourcesData } from "../models/SourcesData";
import { api, buildQueryString } from "./AxiosInstance";
import { Endpoints } from "./Endpoint";

export const fetchAllSources = async (
  partitionId: string,
  queryParams?: Record<string, string | number | undefined>
): Promise<SourcesData> => {
  const queryStringParams = buildQueryString(queryParams);
  const queryString = queryStringParams ? `?${queryStringParams}` : "";
  const response = await api.get<SourcesData>(
    `${Endpoints.sources.replace(
      ":partitionId",
      `${partitionId}`
    )}${queryString}`
  );
  return response.data;
};
