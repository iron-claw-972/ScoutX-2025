import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import firebase from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Page from '../Page';

const Analytics = () => {
  const [team, setTeam] = useState('');  // To store the input team number
  const [teamData, setTeamData] = useState(null);    // To store the fetched team data
  const [loading, setLoading] = useState(false);     // To handle loading state
  const [error, setError] = useState(null);          // To handle error messages

  // Firestore reference to matchScoutData collection
  const matchScoutDataRef = collection(firebase, 'matchScoutData');

  // Fetch the team data based on the entered team number
  const getTeamData = async () => {
    if (!team) return; // Don't fetch if the team number is empty

    setLoading(true);  // Set loading to true when starting to fetch data
    setError(null);    // Reset error state

    try {
      // Query the Firestore collection where the 'team' field matches the entered value
      const q = query(matchScoutDataRef, where('team', '==', team));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No team found with that number!');
      } else {
        // Assuming only one document matches the team number, get the first doc
        const teamDoc = querySnapshot.docs[0];
        setTeamData(teamDoc.data());  // Set the team data in state
      }
    } catch (err) {
      setError('Error fetching document: ' + err.message);  // Handle any errors
    } finally {
      setLoading(false);  // Set loading to false when the fetch is done
    }
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getTeamData();  // Trigger data fetch
  };

  return (
    <Page>
      <Typography variant="h4" gutterBottom>Team Scouting</Typography>

      {/* Input form to enter team number */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Team Number"
          variant="outlined"
          value={team}
          onChange={(e) => setTeam(e.target.value)} // Update state as user types
          fullWidth
          margin="normal"
          type="text"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}  // Disable the button while loading
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Fetch Team Data'}
        </Button>
      </form>

      {/* Error message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display team data if fetched successfully */}
      {teamData && (
        <>
          <Typography variant="h6" gutterBottom>Team Data:</Typography>
          <pre>{JSON.stringify(teamData, null, 2)}</pre>
        </>
      )}
    </Page>
  );
};

export default Analytics; 