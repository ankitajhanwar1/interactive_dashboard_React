import { PerformanceMetrics } from "../models/PerformanceMetrics";
import { api } from "./AxiosInstance";
import { Endpoints } from "./Endpoint";

export const fetchPerformanceReport = async (
  partitionId: string
): Promise<PerformanceMetrics[]> => {
  const response = await api.get<PerformanceMetrics[]>(
    Endpoints.performanceReport.replace(":partitionId", `${partitionId}`)
  );
  return response.data;
};
