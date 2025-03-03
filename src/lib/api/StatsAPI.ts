import {
  ConversionsStats,
  RevenueStats,
  SpendStats,
  SummaryStats,
} from "../models/Stats";
import { api, buildQueryString } from "./AxiosInstance";
import { Endpoints } from "./Endpoint";

export const fetchSummaryStatistics = async (
  partitionId: string,
  queryParams?: Record<string, string | undefined>
): Promise<SummaryStats> => {
  const queryStringParams = buildQueryString(queryParams);
  const queryString = queryStringParams ? `?${queryStringParams}` : "";
  const response = await api.get<SummaryStats>(
    `${Endpoints.summaryStats.replace(
      ":partitionId",
      `${partitionId}`
    )}${queryString}`
  );
  return response.data;
};