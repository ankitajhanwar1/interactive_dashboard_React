import { Fragment, useContext } from "react";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import PartitionDataDetail from "./PartitionData/PartitionDataDetail";
import SourcesList from "./filters/SourcesList";
import DateSelector from "./filters/DateSelector";
import PartitionConversionsDetail from "./PartitionData/PartitionConversionsDetail";
import IndividualStats from "./Statistics/IndividualStats";
import SummaryStatistics from "./Statistics/SummaryStatistics";
import { PartitionIdContext } from "../lib/store/PartitionIDContext";
import OptimizationTargetList from "./filters/OptimizationTargetList";
import PerfReport from "./PerfReport/PerfReport";
import "./dataDashboard.css";

const DataDashboard: React.FC = () => {
  const { partitions, from_date, setStartDate, to_date, setEndDate } =
    useContext(PartitionIdContext);

  const defaultFromDate = dayjs("2022-01-01");
  const defaultToDate = dayjs("2022-12-31");

  const handleStartDateChange = (newDate: dayjs.Dayjs | undefined) => {
    if (newDate && to_date && newDate.isAfter(to_date)) {
      alert("Start Date cannot be after End Date!");
    } else {
      setStartDate(newDate);
    }
  };
  
  const handleEndDateChange = (newDate: dayjs.Dayjs | undefined) => {
    if (newDate && from_date && newDate.isBefore(from_date)) {
      alert("End Date cannot be before Start Date!");
    } else {
      setEndDate(newDate);
    }
  };
  return (
    <Fragment>
      <div className="filters">
        <label>Filters</label>
        <SourcesList />
        <OptimizationTargetList />
        <DateSelector
          label="Start Date"
          date={from_date}
          setDate={handleStartDateChange}
          defaultDate={defaultFromDate}
        />
        <DateSelector
          label="End Date"
          date={to_date}
          setDate={handleEndDateChange}
          defaultDate={defaultToDate}
        />
        {partitions && partitions.length > 0 && (
          <Chip
            label={
              <>
                Country : {partitions[0].country}
                <img
                  src="/flag.jpeg"
                  alt="Germany flag"
                  style={{
                    width: 20,
                    height: 12,
                    marginRight: 8,
                    paddingLeft: 10,
                  }}
                />
              </>
            }
            variant="filled"
            color="default"
            size="medium"
            sx={{ backgroundColor: "rgb(172, 237, 237)", color: "black" }}
          />
        )}
      </div>
      <div className="graph">
        <PartitionDataDetail />
        <PartitionConversionsDetail />
      </div>
      <PerfReport />
      <div className="graph">
        <SummaryStatistics />
        <IndividualStats />
      </div>
      </Fragment>
  );
};

export default DataDashboard;
