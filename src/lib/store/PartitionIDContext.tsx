import React, { useState, useEffect, createContext } from "react";
import { Dayjs } from "dayjs";
import { Partition } from "../models/Partition";
import { fetchAllPartitions } from "../api/PartitionAPI";

type PartitionIdCtxType = {
  partitions: Partition[];
  partitionId: string;
  from_date: Dayjs| undefined;
  setStartDate: (newValue: Dayjs|undefined) => void;
  to_date: Dayjs| undefined;
  setEndDate: (newValue: Dayjs|undefined) => void;
};

export const PartitionIdContext = createContext<PartitionIdCtxType>({
  partitions: [],
  partitionId: "",
  from_date: undefined,
  setStartDate: () => {},
  to_date: undefined,
  setEndDate: () => {},
});

const PartitionIdContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [partitions, setPartitions] = useState<Partition[]>([]);
  const [partitionId, setPartitionId] = useState<string>("");
  const [from_date, setStartDate] = useState<Dayjs | undefined>();
  const [to_date, setEndDate] = useState<Dayjs | undefined>();
  

  useEffect(() => {
    const getPartitions = async () => {
      try {
        const allPartitions = await fetchAllPartitions();

        if (allPartitions && allPartitions.length > 0) {
          setPartitions(allPartitions);
          setPartitionId(allPartitions[0].id);
        }
      } catch (error) {
        console.error("Error fetching partitions:", error);
      }
    };

    getPartitions();
  }, [partitionId]);

  
  const contextValue: PartitionIdCtxType = {
    partitions,
    partitionId,
    from_date,
    setStartDate, 
    to_date: to_date,
    setEndDate
  };

  return (
    <PartitionIdContext.Provider value={contextValue}>
      {children}
    </PartitionIdContext.Provider>
  );
};

export default PartitionIdContextProvider;
