import React, { useState } from 'react';
import { Button, ButtonGroup, Box, Typography, Divider } from '@mui/material';
import Analytics from './Analytics';
import DataTable from './DataTable';

const ToggleComponent = () => {
  const [selectedOption, setSelectedOption] = useState('Data Visualization');

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h4" mb={0}>
        Team Data
      </Typography>
      <Divider sx={{ width: '100%', maxWidth: 400, backgroundColor: 'grey.800', marginY: 2 }} />
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="option selector"
        sx={{ width: '100%', maxWidth: 600 }}
      >
        <Button
          onClick={() => handleSelection('AI Analysis')}
          variant={selectedOption === 'AI Analysis' ? 'contained' : 'outlined'}
          sx={{ flex: 1 }}
        >
          AI Analysis
        </Button>
        <Button
          onClick={() => handleSelection('Data Visualization')}
          variant={selectedOption === 'Data Visualization' ? 'contained' : 'outlined'}
          sx={{ flex: 1 }}
        >
          Data Visualization
        </Button>
      </ButtonGroup>

      <Box mt={4} sx={{ width: '100%', maxWidth: 800 }}>
        {selectedOption === 'AI Analysis' ? <Analytics /> : <DataTable />}
      </Box>
    </Box>
  );
};

export default ToggleComponent;
