import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Typography, TextField, Button, Box } from '@mui/material';
import Page from '../../Page';
import { collection, getDocs } from 'firebase/firestore';
import { ElementPointsTele, ElementPointsAuto } from '../../MatchConstants';

const DataTable = () => {
  const [teamData, setTeamData] = useState(null); // Stores field totals
  const [team, setTeam] = useState(''); // Stores user input for team number
  const [error, setError] = useState(null); // Error state
  const [averageData, setAverageData] = useState(null); 

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
          'leave',
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
          'ClimbPosition' // Just gives sum of points from endgame, not position 
        ];
        const totals = fields.reduce((acc, field) => {
            acc[field] = 0;
            return acc;
        }, {});

        // Calculate totals for each field
        filteredDocs.forEach((doc) => {
          const data = doc.data();
          fields.forEach((field) => {
            if (field === 'leave') {
              console.log(data[field]); 
              if (data[field] === 'true') {
                totals[field]++;
              }
            } else if (field === 'ClimbPosition') {
                if (data[field] === 'Deep') {
                  totals[field] += ElementPointsTele.DEEP; 
                } else if (data[field] === 'Shallow') {
                  totals[field] += ElementPointsTele.SHALLOW; 
                } else if (data[field] === 'Parked') {
                  totals[field] += ElementPointsTele.PARK; 
                }
            } else if (data[field] !== undefined) {
              totals[field] += data[field];
            }
          });
        });
        
        const stats = [
          "Average Points Per Match",
          "Average Cycles Per Match", 
          "Average Auto Points", 
          "Average Tele Points",
        ];
        const data = stats.reduce((acc, stats) => {
          acc[stats] = 0;
          return acc;
        }, {});
        stats.forEach((count) => {
            if (count === 'Average Points Per Match') {
              data[count] = (totals.leave * ElementPointsAuto.LEAVE + 
                            totals.AutoAlgaeNet * ElementPointsAuto.ALGAENET + 
                            totals.AutoAlgaeProcessor * ElementPointsAuto.ALGAEPROCESSOR +
                            totals.AutoCoralL1 * ElementPointsAuto.CORALL1 +
                            totals.AutoCoralL2 * ElementPointsAuto.CORALL2 +
                            totals.AutoCoralL3 * ElementPointsAuto.CORALL3 + 
                            totals.AutoCoralL4 * ElementPointsAuto.CORALL4 +
                            totals.TeleAlgaeNet * ElementPointsTele.ALGAENET +
                            totals.TeleAlgaeProcessor * ElementPointsTele.ALGAEPROCESSOR + 
                            totals.TeleCoralL1 * ElementPointsTele.CORALL1 +
                            totals.TeleCoralL2 * ElementPointsTele.CORALL2 +
                            totals.TeleCoralL3 * ElementPointsTele.CORALL3 +
                            totals.TeleCoralL4 * ElementPointsTele.CORALL4 +
                            totals.ClimbPosition) / filteredDocs.length;
            }
            if (count === 'Average Cycles Per Match') {
                data[count] = (totals.AutoAlgaeNet +
                              totals.AutoAlgaeProcessor +
                              totals.AutoCoralL1 +
                              totals.AutoCoralL2 +
                              totals.AutoCoralL3 +
                              totals.AutoCoralL4 +
                              totals.TeleAlgaeNet +
                              totals.TeleAlgaeProcessor +
                              totals.TeleCoralL1 +
                              totals.TeleCoralL2 +
                              totals.TeleCoralL3 +
                              totals.TeleCoralL4) / filteredDocs.length; 
            }
            if (count === 'Average Auto Points') {
              data[count] = (totals.leave * ElementPointsAuto.LEAVE + 
                            totals.AutoAlgaeNet * ElementPointsAuto.ALGAENET + 
                            totals.AutoAlgaeProcessor * ElementPointsAuto.ALGAEPROCESSOR +
                            totals.AutoCoralL1 * ElementPointsAuto.CORALL1 +
                            totals.AutoCoralL2 * ElementPointsAuto.CORALL2 +
                            totals.AutoCoralL3 * ElementPointsAuto.CORALL3 + 
                            totals.AutoCoralL4 * ElementPointsAuto.CORALL4) / filteredDocs.length;
            }
            if (count === 'Average Tele Points') {
              data[count] = (totals.TeleAlgaeNet * ElementPointsTele.ALGAENET +
                            totals.TeleAlgaeProcessor * ElementPointsTele.ALGAEPROCESSOR + 
                            totals.TeleCoralL1 * ElementPointsTele.CORALL1 +
                            totals.TeleCoralL2 * ElementPointsTele.CORALL2 +
                            totals.TeleCoralL3 * ElementPointsTele.CORALL3 +
                            totals.TeleCoralL4 * ElementPointsTele.CORALL4 +
                            totals.ClimbPosition) / filteredDocs.length;
            }
        });

        setTeamData(totals); // Set the computed totals
        setAverageData(data); // Set average data

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
            <Box>
            <Typography variant="h6" gutterBottom mt={1}>
              Average Data for Team {team}:
            </Typography>
              {Object.entries(averageData).map(([field, value]) => (
                <Typography key={field}>
                  {field}: {value}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
    </Page>
  );
};

export default DataTable;
