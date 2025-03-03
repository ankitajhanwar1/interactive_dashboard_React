import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts";

import { PerformanceMetrics } from "../../lib/models/PerformanceMetrics";
import { PerfReportContext } from "../../lib/store/PerfReportStoreContext";
import { SourcesContext } from "../../lib/store/SourcesStoreContext";
import "./PerfReport.css";

const PerfReport: React.FC = () => {
  const { perfReportData } = useContext(PerfReportContext);
  const { selectedSource } = useContext(SourcesContext);

  const sourceData = perfReportData.filter(
    (item) => item.source === selectedSource
  );

  const sourceItem = sourceData.length > 0 ? sourceData[0] : null;

  let sourceItemObj: { id: number; value: number; label: string }[] = [];
  if (sourceItem) {
    const excludedKeys = new Set(["source", "roas", "cpa"]);
    const dataProperties = Object.keys(sourceItem).filter(
      (key) => !excludedKeys.has(key)
    );

    dataProperties.forEach((key, index) => {
      const value = sourceItem[key as keyof PerformanceMetrics] as
        | number
        | null;
      if (value !== null) {
        sourceItemObj.push({
          id: index,
          value: value,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        });
      }
    });
  }

  let roasCpaItemObj: { id: number; value: number; label: string }[] = [];
  if (sourceItem) {
    const excludedKeys = new Set(["source", "revenue", "conversions", "spend"]);
    const dataProperties = Object.keys(sourceItem).filter(
      (key) => !excludedKeys.has(key)
    );

    dataProperties.forEach((key, index) => {
      const value = sourceItem[key as keyof PerformanceMetrics] as
        | number
        | null;
      if (value !== null && value !== 0) {
        roasCpaItemObj.push({
          id: index,
          value: value,
          label: key.toUpperCase(),
        });
      }
    });
  }

  const isRoasCpaDataEmpty = roasCpaItemObj.length === 0;

  return (
    <div className="pieChart">
      <div className="chartContainer">
        <h2
          className="text-xl font-semibold mb-4 text-align-center"
          style={{ textAlign: "center", padding: "10px" }}
        >
          Performance Report for Source:
          {" " +
            selectedSource.charAt(0).toUpperCase() +
            selectedSource.slice(1).split("_").join(" ")}
        </h2>

        {!selectedSource ? (
          <p style={{ textAlign: "center", padding: "15px" }}>
            To view the report please select a Source
          </p>
        ) : (
          <>
            <PieChart
              series={[
                {
                  data: sourceItemObj,
                  innerRadius: 30,
                  outerRadius: 150,
                  paddingAngle: 1,
                  cornerRadius: 2,
                  cx: 200,
                  cy: 160,
                },
              ]}
              slotProps={{
                legend: {
                  direction: "column",
                  position: { vertical: "middle", horizontal: "right" },
                  padding: 0,
                },
              }}
              colors={["#6667f4", "#fdd568", "#14ccd9"]}
              width={500}
              height={400}
            />
          </>
        )}
      </div>
      <div className="chartContainer">
        <h2
          className="text-xl font-semibold mb-4 text-align-center"
          style={{ textAlign: "center", padding: "10px" }}
        >
          ROAS & CPA for Source:
          {" " +
            selectedSource.charAt(0).toUpperCase() +
            selectedSource.slice(1).split("_").join(" ")}
        </h2>
        {!selectedSource ? (
          <p style={{ textAlign: "center", padding: "15px" }}>
            To view the report please select a Source
          </p>
        ) : (
          <>
            {isRoasCpaDataEmpty ? (
              <p style={{ textAlign: "center", padding: "15px" }}>
                No ROAS & CPA data available.
              </p>
            ) : (
              <>
                <PieChart
                  series={[
                    {
                      data: roasCpaItemObj,
                      innerRadius: 30,
                      outerRadius: 150,
                      paddingAngle: 1,
                      cornerRadius: 2,
                      cx: 200,
                      cy: 160,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: "column",
                      position: { vertical: "middle", horizontal: "right" },
                      padding: 0,
                    },
                  }}
                  colors={["#14ccd9", "#fdd568"]}
                  width={500}
                  height={400}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PerfReport;
