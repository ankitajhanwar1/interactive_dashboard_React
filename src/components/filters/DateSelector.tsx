import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateSelector: React.FC<{ 
  label: string; 
  date: Dayjs | undefined; 
  setDate: (newDate: Dayjs | undefined) => void; 
  defaultDate: Dayjs; 
}> = (props) => {
  const boxStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
  };

  const minDate = dayjs("2022-01-01");
  const maxDate = dayjs("2022-12-31");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer 
        components={["DatePicker"]} 
        sx={{ boxShadow: "0 2px 0px rgba(0, 0, 0, 0.01)", paddingBottom: "3px" }}
      >
        <DatePicker
          value={props.date || props.defaultDate} // Fallback to defaultDate
          onChange={(newDateValue) => props.setDate(newDateValue ?? undefined)}
          label={props.label}
          sx={boxStyle}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateSelector;
