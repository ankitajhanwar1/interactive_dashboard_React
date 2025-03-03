import React, { createContext } from "react";
import { fetchPartitionDetail } from "../api/PartitionAPI";
import { PartitionDetail } from "../models/PartitionDetail";


type PartitionCtxType = {
  getPartitionDetail: (
    partitionId: string,
    queryParams?: Record<string, string>
  ) => Promise<PartitionDetail[] | undefined>;
};

export const PartitionDataContext = createContext<PartitionCtxType>({
  getPartitionDetail: async () => {
    return undefined;
  },
});

const PartitionDataContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {

  const getPartitionDetail = async (
    partitionId: string, partitionDataParams?: Record<string, string>
  ): Promise<PartitionDetail[] | undefined> => {
    try {
      if (partitionId) {
        const partitionData: PartitionDetail[] = await fetchPartitionDetail(
          partitionId, partitionDataParams
        );
        return partitionData;
      }
    } catch (e) {
      return undefined;
    }
  };

  const contextValue: PartitionCtxType = {
    getPartitionDetail,
  };

  return (
    <PartitionDataContext.Provider value={contextValue}>
      {children}
    </PartitionDataContext.Provider>
  );
};

export default PartitionDataContextProvider;
