import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TableContainer, CircularProgress } from "@mui/material";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import firebase from "../../../firebase";
import { ElementPointsTele, ElementPointsAuto } from "../../MatchConstants";

const TeamMatches = () => {
    const [team, setTeam] = useState("");
    const [matches, setMatches] = useState([]); // Stores match data
    const [sortBy, setSortBy] = useState("matchNumber");
    const [sortDirection, setSortDirection] = useState("asc");
    const [error, setError] = useState(""); // To track errors
  
    const matchScoutDataRef = collection(firebase, "matchScoutData");
  
    const handleGetData = async () => {
      setError(""); // Reset error message
    
      try {
        const querySnapshot = await getDocs(matchScoutDataRef);
    
        // Filter only docs where the ID starts with the team number
        const teamDocs = querySnapshot.docs.filter((doc) => {
          const docId = doc.id.split('_')[0]; // Get the team number part of the ID (before the underscore)
          return docId === team; // Only include docs where the team number matches exactly
        });
    
        if (teamDocs.length === 0) {
          setError("No matches found for this team number."); // Display error if no matches are found
        }
    
        const fields = [
          "leave",
          "AutoAlgaeNet",
          "AutoAlgaeProcessor",
          "AutoCoralL1",
          "AutoCoralL2",
          "AutoCoralL3",
          "AutoCoralL4",
          "TeleAlgaeNet",
          "TeleAlgaeProcessor",
          "TeleCoralL1",
          "TeleCoralL2",
          "TeleCoralL3",
          "TeleCoralL4",
          "ClimbPosition",
        ];
    
        const extraInfo = [
          "intakeBroken",
          "outtakeBroken",
          "elevatorBroken",
          "armBroken",
          "brownsOut",
          "wobbly",
          "missesOuttakesConsistently",
          "slowIntakes",
          "disabled",
          "goodDefenseFromOpponents",
          "playedMajorityDefense",
          "touchItOwnIt",
          "aStopped",
          "eStopped",
          "knockedCage",
          "failedClimb",
        ];
  
        const Points = [
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
        ];
    
        // Convert each doc into a structured match object
        const matchData = teamDocs.map((doc) => {
          const data = doc.data();
          let matchObject = {
            matchNumber: data["match"], // Get match number from Firebase
            Points: 0,
            Cycles: 0,
            CoralCycles: 0,
            AlgaeCycles: 0,
          };
    
          // Populate fields with data
          fields.forEach((field) => {
            if (field === "ClimbPosition") {
              if (data[field] === "Deep") {
                matchObject[field] = ElementPointsTele.DEEP;
              } else if (data[field] === "Shallow") {
                matchObject[field] = ElementPointsTele.SHALLOW;
              } else if (data[field] === "Parked") {
                matchObject[field] = ElementPointsTele.PARK;
              } else {
                matchObject[field] = 0;
              }
            } else {
              matchObject[field] = data[field] !== undefined ? data[field] : 0;
            }
          });
    
          // Calculate Points, CoralCycles, AlgaeCycles, and Cycles based on multipliers
          let points = 0;
          let coralCycles = 0;
          let algaeCycles = 0;
    
          // Iterate over Points to calculate the total points
          Points.forEach((fieldConfig) => {
            const fieldValue = parseFloat(data[fieldConfig.field]) || 0; // Ensure valid number, defaults to 0
            points += fieldValue * fieldConfig.multiplier;
            if (fieldConfig.field.includes("Coral")) coralCycles += fieldValue;
            if (fieldConfig.field.includes("Algae")) algaeCycles += fieldValue;
          });
    
          // Calculate total cycles (coral + algae cycles)
          let totalCycles = coralCycles + algaeCycles;
    
          // Set the calculated values into the match object
          matchObject.Points = points;
          matchObject.Cycles = totalCycles;
          matchObject.CoralCycles = coralCycles;
          matchObject.AlgaeCycles = algaeCycles;
    
          // Populate Extra Information at the bottom
          let extraInfoList = [];
          extraInfo.forEach((info) => {
            if (data[info] === "true") {
              extraInfoList.push(info);
            }
          });
          matchObject["Extra Information"] = extraInfoList.join(", ") || "None";
    
          return matchObject;
        });
    
        setMatches(matchData); // Store data in state
      } catch (error) {
        console.error("Error fetching match data:", error);
        setError("Error fetching match data. Please try again."); // Set error message if there's a problem
      } 
    };
    
  
    // Sorting logic
    const handleSort = (column) => {
      if (sortBy === column) {
        // Toggle sort direction if the same column is clicked
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        // Default to 'asc' when a new column is clicked
        setSortBy(column);
        setSortDirection("asc");
      }
    };
  
    // Sort the matches based on the selected column and direction
    const sortedData = [...matches].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
  
      if (sortDirection === 'asc') {
          return valueB - valueA;
        } else {
          return valueA - valueB;
      }
    });
  
    return (
      <>
        <TextField
          label="Enter Team Number"
          variant="outlined"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleGetData} fullWidth>
          Get Data
        </Button>
  
        {/* Display error message if no matches are found or there was an error */}
        {error && <Typography color="error" variant="body1" sx={{ mt: 2 }}>{error}</Typography>}
  
        {/* Display match data in a table */}
        {matches.length > 0 && !error && (
          <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto', mt: 4 }}>
            <Table sx={{ minWidth: 650, backgroundColor: "#f57c00" }}>
              <TableHead sx={{ backgroundColor: "#222", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "#f57c00", fontWeight: "bold" }}>Match Number</TableCell>
                  {Object.keys(sortedData[0]).map((column) =>
                    column !== "matchNumber" ? (
                      <TableCell key={column} sx={{ color: "white" }}>
                        <TableSortLabel
                          active={sortBy === column}
                          direction={sortDirection}
                          onClick={() => handleSort(column)}
                          sx={{
                            color: "white",
                            "&.MuiTableSortLabel-active": {
                              color: "#f57c00", // Orange for active column
                            },
                            "&:hover": {
                              color: "#f57c00", // Orange on hover
                            },
                          }}
                        >
                          {column}
                        </TableSortLabel>
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              </TableHead>
  
              <TableBody>
                {sortedData.map((match, index) => (
                  <TableRow
                    key={match.matchNumber}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#333" : "#444", // Dark grey and black alternating rows
                      "&:hover": {
                        backgroundColor: "#555", // Slightly lighter grey for hover effect
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#f57c00" }}>{match.matchNumber}</TableCell>
                    {Object.entries(match).map(
                      ([key, value]) =>
                        key !== "matchNumber" && (
                          <TableCell
                            key={key}
                            sx={{
                              color: "white",
                              whiteSpace: key === "Extra Information" ? "nowrap" : "normal", // Prevent wrapping for "Extra Information"
                            }}
                          >
                            {value}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  };
  
  export default TeamMatches;
  