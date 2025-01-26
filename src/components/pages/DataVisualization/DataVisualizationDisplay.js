import React, { useState } from 'react';
import { Button, ButtonGroup, Box, Typography, Divider } from '@mui/material';
import Analytics from './Analytics';
import DataTable from './DataTable';
import TeamMatches from './TeamMatches';

const ToggleComponent = () => {
  const [selectedOption, setSelectedOption] = useState('Match Data Visualization');

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
        sx={{ width: '100%', maxWidth: 1000 }}
      >
        <Button
          onClick={() => handleSelection('Match Data Visualization')}
          variant={selectedOption === 'Match Data Visualization' ? 'contained' : 'outlined'}
          sx={{ flex: 1 }}
        >
          Match Data Visualization
        </Button>
        <Button
          onClick={() => handleSelection('Team Data Visualization')}
          variant={selectedOption === 'Team Data Visualization' ? 'contained' : 'outlined'}
          sx={{ flex: 1 }}
        >
          Team Data Visualization
        </Button>
        <Button
          onClick={() => handleSelection('AI Analysis')}
          variant={selectedOption === 'AI Analysis' ? 'contained' : 'outlined'}
          sx={{ flex: 1 }}
        >
          AI Analysis
        </Button>
      </ButtonGroup>

      <Box mt={4} sx={{ width: '100%', maxWidth: 800 }}>
        {selectedOption === 'AI Analysis' ? <Analytics /> : selectedOption === 'Team Data Visualization' ? <TeamMatches /> : <DataTable />}
      </Box>
    </Box>
  );
};

export default ToggleComponent;
