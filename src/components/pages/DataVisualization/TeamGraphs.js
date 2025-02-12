import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ScatterChart, Scatter
} from "recharts";
import { Box, Stack } from "@mui/material";
import { ElementPointsAuto, ElementPointsTele } from "../../MatchConstants";

const colors = ["#f57c00", "#0288d1", "#7b1fa2", "#388e3c", "#d32f2f"];

const TeamGraphs = ({ matches }) => {
  // Ensure matches is an array of objects where each object contains a team and matchData
  const processedTeams = matches.map((teamData, index) => {
    const team = teamData.team;
    const matchData = teamData.matchData;
    
    // Process match data for line chart
    const lineData = matchData.map((match) => ({
      matchNumber: match.matchNumber,
      Points: match.Points,
    })).sort((a, b) => a.matchNumber - b.matchNumber);

    // Process match data for scatter plot
    const scatterData = matchData.map((match) => {
      const algaePoints =
        (match.AutoAlgaeNet || 0) * ElementPointsAuto.ALGAENET +
        (match.AutoAlgaeProcessor || 0) * ElementPointsAuto.ALGAEPROCESSOR +
        (match.TeleAlgaeNet || 0) * ElementPointsTele.ALGAENET +
        (match.TeleAlgaeProcessor || 0) * ElementPointsTele.ALGAEPROCESSOR;
      const coralPoints =
        (match.AutoCoralL1 || 0) * ElementPointsAuto.CORALL1 +
        (match.AutoCoralL2 || 0) * ElementPointsAuto.CORALL2 +
        (match.AutoCoralL3 || 0) * ElementPointsAuto.CORALL3 +
        (match.AutoCoralL4 || 0) * ElementPointsAuto.CORALL4 +
        (match.TeleCoralL1 || 0) * ElementPointsTele.CORALL1 +
        (match.TeleCoralL2 || 0) * ElementPointsTele.CORALL2 +
        (match.TeleCoralL3 || 0) * ElementPointsTele.CORALL3 +
        (match.TeleCoralL4 || 0) * ElementPointsTele.CORALL4;
      return { algaePoints, coralPoints, matchNumber: match.matchNumber };
    }).sort((a, b) => a.coralPoints - b.coralPoints);

    // Calculate averages for radar chart
    const totalMatches = matchData.length;
    const averages = matchData.reduce((acc, match) => {
      acc.AveragePoints += match.Points || 0;
      acc.AverageAlgaeCycles += match.AlgaeCycles || 0;
      acc.AverageCoralCycles += match.CoralCycles || 0;
      acc.AverageAutoPoints += (match.Leave || 0) * ElementPointsAuto.LEAVE +
                               (match.AutoAlgaeNet || 0) * ElementPointsAuto.ALGAENET +
                               (match.AutoAlgaeProcessor || 0) * ElementPointsAuto.ALGAEPROCESSOR +
                               (match.AutoCoralL1 || 0) * ElementPointsAuto.CORALL1 +
                               (match.AutoCoralL2 || 0) * ElementPointsAuto.CORALL2 +
                               (match.AutoCoralL3 || 0) * ElementPointsAuto.CORALL3 +
                               (match.AutoCoralL4 || 0) * ElementPointsAuto.CORALL4;
      acc.AverageClimbPoints += match.Climb || 0;
      return acc;
    }, {
      AveragePoints: 0,
      AverageAlgaeCycles: 0,
      AverageCoralCycles: 0,
      AverageAutoPoints: 0,
      AverageClimbPoints: 0,
    });

    Object.keys(averages).forEach(key => {
      averages[key] = Math.round((averages[key] / totalMatches) * 10) / 10;
    });

    const radarData = [
      { metric: "Points", value: averages.AveragePoints },
      { metric: "Climb Points", value: averages.AverageClimbPoints },
      { metric: "Algae Cycles", value: averages.AverageAlgaeCycles },
      { metric: "Coral Cycles", value: averages.AverageCoralCycles },
      { metric: "Auto Points", value: averages.AverageAutoPoints },
    ];

    return { team, lineData, scatterData, radarData, color: colors[index % colors.length] };
  });

  processedTeams.forEach(({ team, radarData }) => {
    console.log(`Radar Data for Team ${team}:`, radarData);
  });
  
  return (
    <Stack direction={"row"} spacing={4} mt={4}>
      {/* Line Chart */}
      <ResponsiveContainer width="40%" height={500}>
        <LineChart>
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
          {processedTeams.map(({ team, lineData, color }) => (
            <Line key={team} data={lineData} type="linear" dataKey="Points" stroke={color} name={team} />
          ))}
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
          {processedTeams.map(({ team, scatterData, color }) => (
            <Scatter key={team} data={scatterData} name={team} fill={color} shape="circle" />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <ResponsiveContainer width="30%" height={500}>
        <RadarChart>
          <PolarGrid stroke="gray" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="metric"
            stroke="white"
            tickLine={false}
            radius={20}
            tick={({ payload, x, y }) => {
              const words = payload.value.split(" "); // Split label into words
              const offset = {
                "Points": { x: 0, y: -4 },
                "Climb Points": { x: 25, y: 0 },
                "Algae Cycles": { x: 25, y: 15 },
                "Coral Cycles": { x: -25, y: 15 },
                "Auto Points": { x: -25, y: 0 },
              };

              const { x: offsetX, y: offsetY } = offset[payload.value] || { x: 0, y: 0 };

              return (
                <text x={x + offsetX} y={y + offsetY} textAnchor="middle" fill="white" fontSize={14}>
                  {words.map((word, index) => (
                    <tspan key={index} x={x + offsetX} dy={index === 0 ? 0 : 18}>
                        {word}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          {processedTeams.map(({ team, radarData, color }) => (
              <Radar key={team} dataKey="value" data={radarData} name={team} stroke={color} fill={color} fillOpacity={0.6} />
          ))}
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
