import { Box, Typography, Button , TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, useTheme } from '@mui/material';
import React from 'react';

export default function Settings() {

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'egypt',
    'palestine',
    'ksa',
    'usa'
  
  ];
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }
  

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
      
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
  return (
    <Box sx={{ textAlign: 'center', padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Settings</Typography>
      <Box sx={{ marginBottom: 3 }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Country</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Change Country
        </Button>
      </FormControl>
      </Box>

  


      <Box sx={{ marginBottom: 3 }}>
      <TextField value={'example@gamail.com'} id="filled-basic" label="Email" variant="filled" />
      </Box>


      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
}
