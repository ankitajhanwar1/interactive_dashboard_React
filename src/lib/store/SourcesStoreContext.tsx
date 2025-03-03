import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchAllSources } from "../api/SourcesAPI";
import { SourcesData } from "../models/SourcesData";
import { PartitionIdContext } from "./PartitionIDContext";

type SourcesCtxType = {
  sources: string[] | undefined;
  selectedSource: string;
  setSelectedSource: (selectedSource: string) => void;
  optimizationTarget: string;
  setOptimizationTarget: (optimizationTarget: string) => void;
};

export const SourcesContext = createContext<SourcesCtxType>({
  sources: undefined,
  selectedSource: '',
  setSelectedSource: () => {},
  optimizationTarget: '',
  setOptimizationTarget: () => {}
});

const SourcesContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [sources, setSources] = useState<string[]>();
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [optimizationTarget, setOptimizationTarget] = useState<string>('conversions');

  const { partitionId, from_date, to_date} = useContext(PartitionIdContext);

  const getAllSources = async (partitionId: string, queryParams?: Record<string, string>): Promise<void> => {
    try {
      const sourcesData: SourcesData = await fetchAllSources(partitionId, queryParams);
      setSources(sourcesData.sources);
    } catch (e) {
      console.error("Error while getting all sources", e);
    }
  };

  useEffect(() => {
    if (partitionId) {
      const sourceParams: Record<string, string> = {};
      if (from_date)
        sourceParams.from_date = from_date.format("YYYY-MM-DD");
      if (to_date) 
        sourceParams.to_date = to_date.format("YYYY-MM-DD");

      getAllSources(partitionId, Object.keys(sourceParams).length > 0 ? sourceParams: undefined);
    }
  }, [partitionId, from_date, to_date]);

  const contextValue: SourcesCtxType = {
    sources,
    selectedSource,
    setSelectedSource,
    optimizationTarget,
    setOptimizationTarget
  };

  return (
    <SourcesContext.Provider value={contextValue}>
      {children}
    </SourcesContext.Provider>
  );
};

export default SourcesContextProvider;
