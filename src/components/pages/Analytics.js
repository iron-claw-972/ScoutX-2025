import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import firebase from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Page from '../Page';
import axios from 'axios'; // For calling the Firebase function

const Analytics = () => {
  const [team, setTeam] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null); // For GPT response

  const matchScoutDataRef = collection(firebase, 'matchScoutData');

  const getTeamData = async () => {
    if (!team) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const querySnapshot = await getDocs(matchScoutDataRef);

      const filteredDocs = querySnapshot.docs.filter((doc) =>
        doc.id.startsWith(team)
      );

      if (filteredDocs.length === 0) {
        setError('No team found with that number!');
      } else {
        const teamDoc = filteredDocs[0];
        const teamData = teamDoc.data();
        setTeamData(teamData);

        // Send team data to Firebase Cloud Function for GPT analysis
        const response = await axios.post(
          'https://analyzeteamdata-rage5hpe6a-uc.a.run.app',
          { teamData }
        );

        setAnalysis(response.data.analysis); // Display GPT-4 response
      }
    } catch (err) {
      setError('Error fetching document or GPT analysis: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTeamData();
  };

  return (
    <Page>
      <Typography variant="h4" gutterBottom>Team Scouting</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Team Number"
          variant="outlined"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze'}
        </Button>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      {teamData && (
        <>
          <Typography variant="h6" gutterBottom>Team Data:</Typography>
          <pre>{JSON.stringify(teamData, null, 2)}</pre>
        </>
      )}

      {analysis && (
        <>
          <Typography variant="h6" gutterBottom>GPT Analysis:</Typography>
          <pre>{analysis}</pre>
        </>
      )}
    </Page>
  );
};

export default Analytics;
