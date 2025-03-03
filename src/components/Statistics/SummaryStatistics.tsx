import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import { SummaryDataContext } from "../../lib/store/SummaryStoreContext";
import { PartitionIdContext } from "../../lib/store/PartitionIDContext";
import "./SummaryStatistics.css";

const SummaryStatistics: React.FC = () => {
  const { partitions } = useContext(PartitionIdContext);
  const { summaryData } = useContext(SummaryDataContext);
  let brand = "";

  if (partitions && partitions.length > 0) {
    brand = partitions[0].brand;
  }

  const summaryDataArr = summaryData
    ? Object.entries(summaryData).map(([key, value], index) => {
        return {
          id: index,
          value: value,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        };
      })
    : [];

  return (
    <div className="pieChartContainer">
      <h2
        className="text-xl font-semibold mb-4 text-align-center"
        style={{ textAlign: "center" }}
      >
        Summary Statistics for Brand : {brand}
      </h2>
      <PieChart
        series={[
          {
            data: summaryDataArr,
            innerRadius: 30,
            outerRadius: 150,
            paddingAngle: 2,
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
        colors={["#14ccd9", "#fdd568", "#6667f4"]}
        width={500}
        height={500}
      />
    </div>
  );
};

export default SummaryStatistics;
