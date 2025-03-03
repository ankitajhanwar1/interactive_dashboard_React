import React, { createContext, useState, useContext, useEffect } from "react";
import { SummaryStats } from "../models/Stats";
import { fetchSummaryStatistics } from "../api/StatsAPI";
import { PartitionIdContext } from "./PartitionIDContext";
import { SourcesContext } from "./SourcesStoreContext";

type SummaryCtxType = {
  summaryData: SummaryStats | undefined;
};

export const SummaryDataContext = createContext<SummaryCtxType>({
  summaryData: undefined
});

const SummaryContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [summaryData, setSummaryData] = useState<SummaryStats>();

  const { partitionId, from_date, to_date } = useContext(PartitionIdContext);
  const {optimizationTarget} = useContext(SourcesContext)

    useEffect(() => {
      const fetchSummaryData = async () => {
        try {
          if (partitionId) {
            const summaryParams: Record<string, string> = {};
            if (from_date) summaryParams.from_date = from_date.format("YYYY-MM-DD");
            if (to_date) summaryParams.to_date = to_date.format("YYYY-MM-DD");
            if (optimizationTarget) summaryParams.optimisation_target = optimizationTarget;
            const result = await fetchSummaryStatistics(partitionId, Object.keys(summaryParams).length > 0 ? summaryParams: undefined);
            if (result) {
              setSummaryData(result);
            } else {
              setSummaryData({
                conversions: 0,
                revenue: 0,
                spend: 0,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setSummaryData({
            conversions: 0,
            revenue: 0,
            spend: 0,
          });
        } 
      };
  
      fetchSummaryData();
    }, [partitionId, optimizationTarget, from_date, to_date]);

  const contextValue: SummaryCtxType = {
    summaryData
  };

  return (
    <SummaryDataContext.Provider value={contextValue}>
      {children}
    </SummaryDataContext.Provider>
  );
};

export default SummaryContextProvider;
