import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import firebase from '../../../firebase';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Typography,
  Box,
} from '@mui/material';
import Page from '../../Page';
import { ElementPointsTele, ElementPointsAuto } from '../../MatchConstants';

const DataTable = () => {
  const [teamData, setTeamData] = useState([]);
  const [sortBy, setSortBy] = useState('Average Points'); // Default sort column
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  const matchScoutDataRef = collection(firebase, 'matchScoutData');

  const calculateAverages = (teamDocs) => {
    const totals = teamDocs.reduce((acc, doc) => {
      const data = doc.data();
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
        'ClimbPosition',
      ];
      fields.forEach((field) => {
        if (!acc[field]) acc[field] = 0;
        if (field === 'leave') {
          if (data[field] === 'true') acc[field]++;
        } else if (field === 'ClimbPosition') {
          if (data[field] === 'Deep') acc[field] += ElementPointsTele.DEEP;
          else if (data[field] === 'Shallow') acc[field] += ElementPointsTele.SHALLOW;
          else if (data[field] === 'Parked') acc[field] += ElementPointsTele.PARK;
        } else if (data[field] !== undefined) {
          acc[field] += data[field];
        }
      });
      return acc;
    }, {});

    const matchCount = teamDocs.length;
    const statsConfig = {
      "Average Points": {
        fields: [
          { field: 'leave', multiplier: ElementPointsAuto.LEAVE },
          { field: 'AutoAlgaeNet', multiplier: ElementPointsAuto.ALGAENET },
          { field: 'AutoAlgaeProcessor', multiplier: ElementPointsAuto.ALGAEPROCESSOR },
          { field: 'AutoCoralL1', multiplier: ElementPointsAuto.CORALL1 },
          { field: 'AutoCoralL2', multiplier: ElementPointsAuto.CORALL2 },
          { field: 'AutoCoralL3', multiplier: ElementPointsAuto.CORALL3 },
          { field: 'AutoCoralL4', multiplier: ElementPointsAuto.CORALL4 },
          { field: 'TeleAlgaeNet', multiplier: ElementPointsTele.ALGAENET },
          { field: 'TeleAlgaeProcessor', multiplier: ElementPointsTele.ALGAEPROCESSOR },
          { field: 'TeleCoralL1', multiplier: ElementPointsTele.CORALL1 },
          { field: 'TeleCoralL2', multiplier: ElementPointsTele.CORALL2 },
          { field: 'TeleCoralL3', multiplier: ElementPointsTele.CORALL3 },
          { field: 'TeleCoralL4', multiplier: ElementPointsTele.CORALL4 },
          { field: 'ClimbPosition', multiplier: 1 },
        ],
      },
      "Average Cycles": {
        fields: [
          'AutoAlgaeNet', 'AutoAlgaeProcessor', 'AutoCoralL1', 'AutoCoralL2',
          'AutoCoralL3', 'AutoCoralL4', 'TeleAlgaeNet', 'TeleAlgaeProcessor',
          'TeleCoralL1', 'TeleCoralL2', 'TeleCoralL3', 'TeleCoralL4',
        ],
      },
      "Average Auto Points": {
        fields: [
          { field: 'leave', multiplier: ElementPointsAuto.LEAVE },
          { field: 'AutoAlgaeNet', multiplier: ElementPointsAuto.ALGAENET },
          { field: 'AutoAlgaeProcessor', multiplier: ElementPointsAuto.ALGAEPROCESSOR },
          { field: 'AutoCoralL1', multiplier: ElementPointsAuto.CORALL1 },
          { field: 'AutoCoralL2', multiplier: ElementPointsAuto.CORALL2 },
          { field: 'AutoCoralL3', multiplier: ElementPointsAuto.CORALL3 },
          { field: 'AutoCoralL4', multiplier: ElementPointsAuto.CORALL4 },
        ],
      },
      "Average Endgame Points": {
        fields: [{ field: 'ClimbPosition', multiplier: 1 }],
      },
    };

    return Object.keys(statsConfig).reduce((acc, statName) => {
      const { fields } = statsConfig[statName];
      if (statName === 'Average Cycles') {
        acc[statName] = Math.round(
          (fields.reduce((sum, field) => sum + (totals[field] || 0), 0) / matchCount) * 10
        ) / 10;
      } else {
        acc[statName] = Math.round(
          (fields.reduce((sum, { field, multiplier }) => sum + (totals[field] || 0) * multiplier, 0) / matchCount) * 10
        ) / 10;
      }
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(matchScoutDataRef);
      const groupedByTeam = querySnapshot.docs.reduce((acc, doc) => {
        const [teamNumber] = doc.id.split('_'); // Extract team number from the document ID
        if (!acc[teamNumber]) acc[teamNumber] = []; // Initialize an array if it's the first document for this team
        acc[teamNumber].push(doc); // Add the current document to the team’s array
        return acc;
      }, {});

      // Array of objects, where each object contains the teamNumber and the calculated averages for that team
      const teamAverages = Object.entries(groupedByTeam).map(([teamNumber, teamDocs]) => ({
        teamNumber,
        ...calculateAverages(teamDocs), // Calls the calculateAverages function for each team
      }));

      setTeamData(teamAverages);
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to 'asc' when a new column is clicked (to sort the largest first)
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  // The .sort() function works by comparing two values at a time (in this case, the values of a[sortBy] and b[sortBy]) 
  // Negative (e.g., valueB - valueA): The value of b comes before a in the sorted array.
  // Positive (e.g., valueA - valueB): The value of a comes before b in the sorted array.
  // Zero: a and b remain unchanged relative to each other.
  const sortedData = [...teamData].sort((a, b) => {
    // Values of the columns currently being sorted by (ex: 'Average Points')  
    const valueA = a[sortBy]; 
    const valueB = b[sortBy];
  
    // When sortDirection is 'asc', we sort by descending values (largest at the top)
    if (sortDirection === 'asc') {
      // valueB - valueA is used, ensuring the highest values come first
      return valueB - valueA;
    } else {
      // valueA - valueB is used, ensuring the smallest values come first
      return valueA - valueB;
    }
  });
  
  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        width: '100%',
      }}
    >
      <Table sx={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f57c00', mt: 2}}>
        <TableHead sx={{ backgroundColor: '#222', color: 'white' }}>
          <TableRow>
            <TableCell sx={{ color: '#f57c00', fontWeight: 'bold' }}>Team Number</TableCell>
            {['Average Points', 'Average Cycles', 'Average Auto Points', 'Average Endgame Points'].map((column) => (
              <TableCell key={column} sx={{ color: 'white' }}>
                <TableSortLabel
                  active={sortBy === column}
                  direction={sortDirection}
                  onClick={() => handleSort(column)}
                  sx={{
                    color: 'white',
                    '&.MuiTableSortLabel-active': {
                      color: '#f57c00', // Orange for active column
                    },
                    '&:hover': {
                      color: '#f57c00', // Orange on hover
                    },
                  }}
                >
                  {column}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((team, index) => (
            <TableRow 
              key={team.teamNumber}
              sx={{
                backgroundColor: index % 2 === 0 ? '#333' : '#444', // Dark grey and black alternating rows
                '&:hover': {
                  backgroundColor: '#555', // Slightly lighter grey for hover effect
                },
              }}
            >
              <TableCell sx={{ color: '#f57c00' }}>{team.teamNumber}</TableCell>
              <TableCell sx={{ color: 'white' }}>{team['Average Points']}</TableCell>
              <TableCell sx={{ color: 'white' }}>{team['Average Cycles']}</TableCell>
              <TableCell sx={{ color: 'white' }}>{team['Average Auto Points']}</TableCell>
              <TableCell sx={{ color: 'white' }}>{team['Average Endgame Points']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DataTable;