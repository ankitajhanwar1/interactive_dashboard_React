import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "@mui/material";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import dayjs from "dayjs";

import { PartitionDataContext } from "../../lib/store/PartitionDataContext";
import { PartitionDetail } from "../../lib/models/PartitionDetail";
import { SourcesContext } from "../../lib/store/SourcesStoreContext";
import { PartitionIdContext } from "../../lib/store/PartitionIDContext";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PartitionConversionsDetail: React.FC = () => {
  const [data, setData] = useState<PartitionDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { partitionId, partitions, from_date, to_date } =
    useContext(PartitionIdContext);
  const { getPartitionDetail } = useContext(PartitionDataContext);

  const { selectedSource, optimizationTarget } = useContext(SourcesContext);
  let brand = "";

  if (partitions && partitions.length > 0) {
    brand = partitions[0].brand;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams: Record<string, string> = {};
        if (from_date) queryParams.from_date = from_date.format("YYYY-MM-DD");
        if (to_date) queryParams.to_date = to_date.format("YYYY-MM-DD");
        if (selectedSource) queryParams.source = selectedSource;
        if (optimizationTarget)
          queryParams.optimisation_target = optimizationTarget;
        const result = await getPartitionDetail(
          partitionId,
          Object.keys(queryParams).length > 0 ? queryParams : undefined
        );
        if (result) {
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [partitionId, from_date, to_date, selectedSource, optimizationTarget, getPartitionDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const labels = data.map((item) => item.date);
  const conversionsData = data.map((item) => item.attributed_conversions);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Attributed Conversions",
        data: conversionsData,
        borderColor: "#14ccd9",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Data Visualization for Brand: ${brand}`,
      },
    },
  };

  const graphContainer = {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    backgroundColor: "white",
    borderRadius: "20px",
    paddingTop: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "100%",
  };

  return (
    <Container sx={graphContainer}>
      <div
        className="p-4 bg-white shadow rounded-lg"
        style={{ textAlign: "center" }}
      >
        {!selectedSource ? (
          <h2>Attributed Conversions for All Sources</h2>
        ) : (
          <h2>
            Attributed Conversions for Source:{" "}
            {selectedSource.charAt(0).toUpperCase() +
              selectedSource.slice(1).split("_").join(" ")}
          </h2>
        )}
        <Line data={chartData} options={options} />
      </div>
    </Container>
  );
};

export default PartitionConversionsDetail;
