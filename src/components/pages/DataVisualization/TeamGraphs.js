import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Stack } from "@mui/material";

const TeamGraphs = ({ matches }) => {
  // Map matches to get data for the graph
  const data = matches.map((match) => ({
    matchNumber: match.matchNumber,
    Points: match.Points,
  }));

  return (
    <Stack direction={"row"} spacing={4} mt={4}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X Axis with Label */}
          <XAxis dataKey="matchNumber" label={{ value: 'Matches', position: 'bottom', offset: 5 }} />
          
          {/* Y Axis with Label */}
          <YAxis label={{ value: 'Points', angle: -90, position: 'insideLeft' }} />
          
          {/* Custom Tooltip with orange text and black background */}
          <Tooltip 
            contentStyle={{
              backgroundColor: 'black',
              color: 'primary',
              borderRadius: '4px',
              fontSize: '14px',
              padding: '8px',
            }} 
          />
          
          {/* Legend moved to the left */}
          <Legend 
            align="left"
          />
          
          {/* Line chart with points */}
          <Line type="linear" dataKey="Points" stroke="#f57c00" />
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default TeamGraphs;
