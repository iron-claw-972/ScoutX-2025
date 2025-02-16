  import React, { useState } from 'react';
  import { Button, ButtonGroup, Box, Typography, Divider, useMediaQuery } from '@mui/material';
  import Analytics from './Analytics';
  import DataTable from './DataTable';
  import TeamMatches from './TeamMatches';
  import { Stack } from '@mui/system';

  const DataVisualizationDisplay = () => {
    const [selectedOption, setSelectedOption] = useState('Match Data Visualization');

    
    const handleSelection = (option) => {
      setSelectedOption(option);
    };

    // Use `useMediaQuery` to determine if the screen is small
    const isSmallScreen = useMediaQuery("(max-width: 960px)");

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h4">
          Team Data
        </Typography>
        <Divider sx={{ width: '50%', backgroundColor: 'grey.800', marginY: 4 }} />
        <ButtonGroup
          variant="outlined"
          color="primary"
          aria-label="option selector"
          sx={{ width: isSmallScreen ? '100%' : '75%' }}
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

        <Box mt={4} mb={7} sx={{ width: '100%' }}>
          {selectedOption === 'AI Analysis' ? <Analytics /> : selectedOption === 'Team Data Visualization' ? <TeamMatches /> : <DataTable />}
        </Box>
      </Box>
    );
  };

  export default DataVisualizationDisplay;
