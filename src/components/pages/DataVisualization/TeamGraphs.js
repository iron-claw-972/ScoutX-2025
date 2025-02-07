import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ScatterChart, Scatter
} from "recharts";
import { Box, Stack } from "@mui/material";
import { ElementPointsAuto, ElementPointsTele } from "../../MatchConstants";

const TeamGraphs = ({ matches }) => {
  // Map matches to get data for the graph
  const data = matches
    .map((match) => ({
      matchNumber: match.matchNumber,
      Points: match.Points,
    }))
    .sort((a, b) => a.matchNumber - b.matchNumber); // Sort the data by match number in ascending order

  const Averages = {
    AveragePoints: 0,
    AverageAlgaeCycles: 0,
    AverageCoralCycles: 0,
    AverageAutoPoints: 0,
    AverageClimbPoints: 0,
  };

  // Calculate the Algae and Coral points for each match and prepare data for scatter plot
  const scatterData = matches.map((match) => {
    const algaePoints =
      (match.AutoAlgaeNet || 0) * ElementPointsAuto.ALGAENET +
      (match.AutoAlgaeProcessor || 0) * ElementPointsAuto.ALGAEPROCESSOR +
      (match.TeleAlgaeNet || 0) * ElementPointsTele.ALGAENET +
      (match.TeleAlgaeProccessor || 0) * ElementPointsTele.ALGAEPROCESSOR;
    const coralPoints =
      (match.AutoCoralL1 || 0) * ElementPointsAuto?.CORALL1 +
      (match.AutoCoralL2 || 0) * ElementPointsAuto?.CORALL2 +
      (match.AutoCoralL3 || 0) * ElementPointsAuto?.CORALL3 +
      (match.AutoCoralL4 || 0) * ElementPointsAuto?.CORALL4 +
      (match.TeleCoralL1 || 0) * ElementPointsTele.CORALL1 +
      (match.TeleCoralL2 || 0) * ElementPointsTele.CORALL2 +
      (match.TeleCoralL3 || 0) * ElementPointsTele.CORALL3 +
      (match.TeleCoralL4 || 0) * ElementPointsTele.CORALL4;
    return { algaePoints, coralPoints, matchNumber: match.matchNumber };
  });

  // Sort scatter data by coral points in ascending order
  const sortedScatterData = scatterData.sort((a, b) => a.coralPoints - b.coralPoints);

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
      <ResponsiveContainer width="40%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="matchNumber" label={{ value: "Matches", position: "bottom", offset: 5 }} />
          <YAxis label={{ value: "Points", angle: -90, position: "insideLeft" }} />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { matchNumber, Points } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "14px",
                      padding: "6px 12px",
                      border: "1px solid white",
                    }}
                  >
                    <strong style={{ color: "#f57c00" }}>Match Number: {matchNumber}</strong>
                    <br />
                    Points: {Points}
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
          />
          <Legend align="left" />
          <Line type="linear" dataKey="Points" stroke="#f57c00" />
        </LineChart>
      </ResponsiveContainer>

      {/* Scatter Chart */}
      <ResponsiveContainer width="30%" height={500}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3"  />
          <XAxis
            dataKey="coralPoints"
            name="Coral Points"
            stroke="gray"
            label={{ value: "Coral Points", position: "bottom", offset: 5 }}
          />
          <YAxis
            dataKey="algaePoints"
            name="Algae Points"
            stroke="gray"
            label={{ value: "Algae Points", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { matchNumber, algaePoints, coralPoints } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "14px",
                      padding: "6px 12px",
                      border: "1px solid white",
                    }}
                  >
                    <strong style={{ color: "#f57c00" }}>Match Number: {matchNumber}</strong>
                    <br />
                    Algae Points: {algaePoints}
                    <br />
                    Coral Points: {coralPoints}
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
          />
          <Legend align="left" />
          <Scatter name="Algae vs Coral" data={sortedScatterData} fill="#f57c00" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <ResponsiveContainer width="30%" height={500}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="gray" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="metric"
            stroke="white"
            tickLine={false}
            radius={20}
            tick={({ payload, x, y }) => {
              const angle = payload.angle;
              const offset = {
                "Points": { x: 0, y: -8 },
                "Climb Points": { x: 45, y: 0 },
                "Algae Cycles": { x: 25, y: 20 },
                "Coral Cycles": { x: -25, y: 20 },
                "Auto Points": { x: -45, y: 0 },
              };

              const { x: offsetX, y: offsetY } = offset[payload.value] || { x: 0, y: 0 };

              return (
                <text x={x + offsetX} y={y + offsetY} textAnchor="middle" fill="white" fontSize={14}>
                  {payload.value}
                </text>
              );
            }}
          />
          <Radar
            name="Team Averages"
            dataKey="value"
            stroke="#f57c00"
            fill="url(#gradient)"
            fillOpacity={0.7}
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f57c00" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#f57c00" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { metric, value } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "14px",
                      padding: "6px 12px",
                      border: "1px solid white",
                    }}
                  >
                    <strong style={{ color: "#f57c00" }}>
                      {metric}: {value}
                    </strong>
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
            contentStyle={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "6px",
              fontSize: "14px",
              padding: "6px 12px",
              border: "1px solid white",
            }}
          />
          <Legend 
            verticalAlign="top" 
            align="center" 
            />
        </RadarChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default TeamGraphs;
