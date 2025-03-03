import { Partition } from "../models/Partition";
import { PartitionDetail } from "../models/PartitionDetail";
import { api, buildQueryString } from "./AxiosInstance";
import { Endpoints } from "./Endpoint";

export const fetchAllPartitions = async (): Promise<Partition[]> => {
  const response = await api.get<Partition[]>(Endpoints.partitions);
  return response.data;
};

export const fetchPartitionDetail = async (
  partitionId: string,
  queryParams?: Record<string, string | number | undefined>
): Promise<PartitionDetail[]> => {
  const queryStringParams = buildQueryString(queryParams);
  const queryString = queryStringParams ? `?${queryStringParams}` : "";
  const response = await api.get<PartitionDetail[]>(
    `${Endpoints.partitionData.replace(
      ":partitionId",
      `${partitionId}`
    )}${queryString}`
  );
  return response.data;
};
