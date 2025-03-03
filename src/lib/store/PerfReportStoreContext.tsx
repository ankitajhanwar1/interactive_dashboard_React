import React, { createContext, useState, useContext, useEffect } from "react";
import { PerformanceMetrics } from "../models/PerformanceMetrics";
import { fetchPerformanceReport } from "../api/PerformanceReportAPI";
import { PartitionIdContext } from "./PartitionIDContext";

type PerfReportCtxType = {
  perfReportData: PerformanceMetrics[] ;
};

export const PerfReportContext = createContext<PerfReportCtxType>({
  perfReportData: [],
});

const PerfReportContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [perfReportData, setPerfReportData] = useState<PerformanceMetrics[]>([]);

  const { partitionId } = useContext(PartitionIdContext);

  useEffect(() => {
    const fetchPerfReport = async () => {
      try {
        if (partitionId) {
          const result = await fetchPerformanceReport(partitionId);
          if (result) {
            setPerfReportData(result);
          } else {
            setPerfReportData([{
              source: "",
              revenue: 0,
              conversions: 0,
              spend: 0,
              roas: null,
              cpa: 0,
            }]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPerfReportData([{
          source: "",
          revenue: 0,
          conversions: 0,
          spend: 0,
          roas: null,
          cpa: 0,
        }]);
      }
    };

    fetchPerfReport();
  }, [partitionId]);

  const contextValue: PerfReportCtxType = {
    perfReportData
  };

  return (
    <PerfReportContext.Provider value={contextValue}>
      {children}
    </PerfReportContext.Provider>
  );
};

export default PerfReportContextProvider;
