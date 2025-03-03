import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { SourcesContext } from "../../lib/store/SourcesStoreContext";

const SourcesList: React.FC = () => {
  const { sources, selectedSource, setSelectedSource } =
    React.useContext(SourcesContext);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setSelectedSource(newValue); 
  };

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: "8px", 
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center"
  };

  return (
    <Box sx={{ maxWidth: 400, minWidth: 400 }}>
      <FormControl sx={boxStyle}>
        <InputLabel id="demo-simple-select-label">Sources</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSource}
          label="Sources"
          onChange={handleChange}
        >
          {sources &&
            sources.length > 0 &&
            sources.map((source) => (
              <MenuItem key={source} value={source}>
                {source.charAt(0).toUpperCase() + source.slice(1).split('_').join(' ')}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SourcesList;
