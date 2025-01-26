import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Typography, TextField, Button, Box } from '@mui/material';
import Page from '../../Page';
import { collection, getDocs } from 'firebase/firestore';

const DataTable = () => {
  const [teamData, setTeamData] = useState(null); // Stores field totals
  const [team, setTeam] = useState(''); // Stores user input for team number
  const [error, setError] = useState(null); // Error state

  const matchScoutDataRef = collection(firebase, 'matchScoutData');

  const getTeamDataTotals = async (teamNumber) => {
    if (!teamNumber) return;

    setError(null);

    try {
      const querySnapshot = await getDocs(matchScoutDataRef);

      const filteredDocs = querySnapshot.docs.filter((doc) =>
        doc.id.startsWith(String(teamNumber))
      );

      if (filteredDocs.length === 0) {
        setError('No team found with that number');
        setTeamData(null);
      } else {
        // Initialize totals for specified fields
        const fields = [
          'AutoAlgaeNet',
          'AutoAlgaeProcessor',
          'AutoCoralL1',
          'AutoCoralL2',
          'AutoCoralL3',
          'AutoCoralL4',
          'TeleAlgaeNet',
          'TeleAlgaeProcessor',
          'TeleCoralL1',
          'TeleCoralL2',
          'TeleCoralL3',
          'TeleCoralL4',
        ];
        const totals = fields.reduce((acc, field) => {
          acc[field] = 0;
          return acc;
        }, {});

        // Calculate totals for each field
        filteredDocs.forEach((doc) => {
          const data = doc.data();
          fields.forEach((field) => {
            if (data[field] !== undefined) {
              totals[field] += data[field];
            }
          });
        });

        setTeamData(totals); // Set the computed totals
      }
    } catch (err) {
      setError('Error fetching document: ' + err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTeamDataTotals(team);
  };

  return (
    <Page>
      <Box sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Team Number"
            variant="outlined"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Get Team Data
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body1" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display Field Totals */}
        {teamData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Totals for Team {team}:
            </Typography>
            <Box>
              {Object.entries(teamData).map(([field, value]) => (
                <Typography key={field}>
                  {field}: {value}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default DataTable;
