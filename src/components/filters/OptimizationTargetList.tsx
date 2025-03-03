import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { SourcesContext } from "../../lib/store/SourcesStoreContext";

enum Targets {
  Conversions= "conversions",
  Revenue= "revenue"
};


const OptimizationTargetList: React.FC = () => {
  const { optimizationTarget, setOptimizationTarget } =
    React.useContext(SourcesContext);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value  as Targets;
    setOptimizationTarget(newValue); 
  };


  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: "8px", 
    width: "200px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center"
  };

  return (
    <Box sx={{ maxWidth: 200, minWidth: 200 }}>
      <FormControl sx={boxStyle}>
        <InputLabel id="optimization-target-label">Optimization Target</InputLabel>
        <Select
          labelId="optimization-target-label"
          id="optimization-target-select"
          label="Optimization Target"
          value={optimizationTarget}
          onChange={handleChange}
        >
          {Object.values(Targets).map((target) => (
              <MenuItem key={target} value={target}>
                {target.charAt(0).toUpperCase() + target.slice(1).split('_').join(' ')}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default OptimizationTargetList;
