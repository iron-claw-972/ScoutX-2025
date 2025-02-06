import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import { Box, Stack } from "@mui/material";
import { ElementPointsAuto } from "../../MatchConstants";

const TeamGraphs = ({ matches }) => {
  // Map matches to get data for the graph
  const data = matches.map((match) => ({
    matchNumber: match.matchNumber,
    Points: match.Points,
  }));

  const Averages = {
    AveragePoints: 0, 
    AverageAlgaeCycles: 0,
    AverageCoralCycles: 0, 
    AverageAutoPoints: 0,
    AverageClimbPoints: 0,
  };

  // First, sum up all the values
  matches.forEach((match) => {
    Averages.AveragePoints += match.Points || 0;
    Averages.AverageAlgaeCycles += match.AlgaeCycles || 0;
    Averages.AverageCoralCycles += match.CoralCycles || 0;
    Averages.AverageAutoPoints += 
      (match.Leave || 0) * (ElementPointsAuto?.LEAVE || 0) +
      (match.AutoAlgaeNet || 0) * (ElementPointsAuto?.ALGAENET || 0) +
      (match.AutoAlgaeProcessor || 0) * (ElementPointsAuto?.ALGAEPROCESSOR || 0) +
      (match.AutoCoralL1 || 0) * (ElementPointsAuto?.CORALL1 || 0) +
      (match.AutoCoralL2 || 0) * (ElementPointsAuto?.CORALL2 || 0) +
      (match.AutoCoralL3 || 0) * (ElementPointsAuto?.CORALL3 || 0) +
      (match.AutoCoralL4 || 0) * (ElementPointsAuto?.CORALL4 || 0);
    Averages.AverageClimbPoints += match.Climb || 0;
  });

  // Get the number of matches
  const matchCount = matches.length;

  // Divide each total by the number of matches to get the average
  if (matchCount > 0) {
    Object.keys(Averages).forEach((key) => {
      Averages[key] /= matchCount;
      Averages[key] = Math.round(Averages[key] * 10) / 10; 
    });
  }

  console.log(Averages);

  const radarData = [
    { metric: "Points", value: Averages.AveragePoints }, // Top
    { metric: "Climb Points", value: Averages.AverageClimbPoints }, // Right
    { metric: "Algae Cycles", value: Averages.AverageAlgaeCycles }, // Bottom Right
    { metric: "Coral Cycles", value: Averages.AverageCoralCycles }, // Bottom Left
    { metric: "Auto Points", value: Averages.AverageAutoPoints }, // Left
  ];

  return (
    <Stack direction={"row"} spacing={4} mt={4}>
      {/* Line Chart */}
      <ResponsiveContainer width="65%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="matchNumber" label={{ value: "Matches", position: "bottom", offset: 5 }} />
          <YAxis label={{ value: "Points", angle: -90, position: "insideLeft" }} />
          {/* Updated Tooltip with Solid Black Background, White Border, and White Font */}
          <Tooltip 
            contentStyle={{
              backgroundColor: "black", 
              color: "white", 
              borderRadius: "6px", 
              fontSize: "14px", 
              padding: "6px 12px",
              border: "1px solid white"  // White border for the tooltip
            }} 
            cursor={false}  // Hides the cursor line for a cleaner look
          />
          <Legend align="left" />
          <Line type="linear" dataKey="Points" stroke="#f57c00" />
        </LineChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <ResponsiveContainer width="30%" height={400}>
        <RadarChart data={radarData}>
          {/* Grid with a dashed stroke for better contrast */}
          <PolarGrid stroke="gray" strokeDasharray="3 3" />

          {/* Labels with extended distance */}
          <PolarAngleAxis 
            dataKey="metric" 
            stroke="white"  
            tickLine={false} 
            radius={20}
            tick={({ payload, x, y }) => {
              const angle = payload.angle;
              const offset = {
                "Points": { x: 0, y: -4 },        // Move Points up
                "Climb Points": { x: 45, y: 0 }, // Move Climb Points right
                "Algae Cycles": { x: 25, y: 20 }, // Move Algae Cycles bottom-right
                "Coral Cycles": { x: -25, y: 20 }, // Move Coral Cycles bottom-left
                "Auto Points": { x: -45, y: 0 }  // Move Auto Points left
              };

              const { x: offsetX, y: offsetY } = offset[payload.value] || { x: 0, y: 0 };
              
              return (
                <text
                  x={x + offsetX}
                  y={y + offsetY}
                  textAnchor="middle"
                  fill="white"
                  fontSize={14}
                >
                  {payload.value}
                </text>
              );
            }} 
          />

          {/* Radar with orange stroke and semi-transparent fill */}
          <Radar 
            name="Team Averages" 
            dataKey="value" 
            stroke="#f57c00" 
            fill="url(#gradient)" 
            fillOpacity={0.7} 
            strokeWidth={2}
          />

          {/* Adding a subtle orange gradient effect */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f57c00" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#f57c00" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {/* Updated Tooltip for Radar with Solid Black Background, White Border, and White Font */}
          <Tooltip 
            contentStyle={{
              backgroundColor: "black", 
              color: "white", 
              borderRadius: "6px", 
              fontSize: "14px", 
              padding: "6px 12px",
              border: "1px solid white"  // White border for the tooltip
            }} 
            cursor={false}  // Optional: Hides the cursor line for a cleaner look
          />

          <Legend verticalAlign="top" align="center" wrapperStyle={{ color: "black" }} />
        </RadarChart>
      </ResponsiveContainer>    
    </Stack>
  );
};

export default TeamGraphs;
