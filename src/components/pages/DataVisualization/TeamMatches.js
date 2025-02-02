import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TableContainer, CircularProgress, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import firebase from "../../../firebase";
import { ElementPointsTele, ElementPointsAuto } from "../../MatchConstants";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TeamGraphs from "./TeamGraphs";
import { Stack } from "@mui/system";

const TeamMatches = () => {
  const [team, setTeam] = useState("");
  const [matches, setMatches] = useState([]); // Stores match data
  const [deletedRows, setDeletedRows] = useState([]); // Stores deleted rows
  const [sortBy, setSortBy] = useState("matchNumber");
  const [sortDirection, setSortDirection] = useState("asc");
  const [error, setError] = useState(""); // To track errors
  const [restoreMatch, setRestoreMatch] = useState(""); // Selected match to restore
  const [hoveredRow, setHoveredRow] = useState(null); // Track hovered row

  const matchScoutDataRef = collection(firebase, "matchScoutData");

  const handleGetData = async () => {
    setError(""); // Reset error message

    try {
      const querySnapshot = await getDocs(matchScoutDataRef);

      const teamDocs = querySnapshot.docs.filter((doc) => {
        const docId = doc.id.split('_')[0]; 
        return docId === team;
      });

      if (teamDocs.length === 0) {
        setError("No matches found for this team number.");
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
        { field: 'Leave', multiplier: ElementPointsAuto.LEAVE },
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
        { field: 'Climb', multiplier: 1 },
      ];

      const matchData = teamDocs.map((doc) => {
        const data = doc.data();
        let matchObject = {
          matchNumber: data["match"], // Get match number from Firebase
          Points: 0,
          Cycles: 0,
          CoralCycles: 0,
          AlgaeCycles: 0,
        };

        fields.forEach((field) => {
          if (field === "ClimbPosition") {
            if (data[field] === "Deep") {
              matchObject["Climb"] = ElementPointsTele.DEEP;
            } else if (data[field] === "Shallow") {
              matchObject["Climb"] = ElementPointsTele.SHALLOW;
            } else if (data[field] === "Parked") {
              matchObject["Climb"] = ElementPointsTele.PARK;
            } else {
              matchObject["Climb"] = 0;
            }
          } else if (field === 'leave') {
            matchObject['Leave'] = data[field] === 'true' ? 1 : 0;
          } else {
            matchObject[field] = data[field] !== undefined ? data[field] : 0;
          }
        });

        let points = 0;
        let coralCycles = 0;
        let algaeCycles = 0;

        Points.forEach((fieldConfig) => {
            let fieldValue = matchObject[fieldConfig.field];
            const multiplier = fieldConfig.multiplier;
            points += fieldValue * multiplier;
            if (fieldConfig.field.includes("Coral")) coralCycles += fieldValue;
            if (fieldConfig.field.includes("Algae")) algaeCycles += fieldValue;
        });

        let totalCycles = coralCycles + algaeCycles;

        matchObject.Points = points;
        matchObject.Cycles = totalCycles;
        matchObject.CoralCycles = coralCycles;
        matchObject.AlgaeCycles = algaeCycles;

        let extraInfoList = [];
        extraInfo.forEach((info) => {
          if (data[info] === "true") {
            extraInfoList.push(info);
          }
        });
        matchObject["Extra Information"] = extraInfoList.join(", ") || "None";

        return matchObject;
      });

      setMatches(matchData);
    } catch (error) {
      console.error("Error fetching match data:", error);
      setError("Error fetching match data. Please try again.");
    }
  };

  const handleDeleteRow = (matchNumber) => {
    const updatedMatches = matches.filter(match => match.matchNumber !== matchNumber);
    const deletedMatch = matches.find(match => match.matchNumber === matchNumber);
    setMatches(updatedMatches);
    setDeletedRows([...deletedRows, deletedMatch]);
  };

  const handleRestoreRow = () => {
    const matchToRestore = deletedRows.find(match => match.matchNumber === restoreMatch);
    setMatches([...matches, matchToRestore]);
    setDeletedRows(deletedRows.filter(match => match.matchNumber !== restoreMatch));

    // Clear restoreMatch after restoring the match to prevent the button from appearing again
    setRestoreMatch("");
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

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

      {error && <Typography color="error" variant="body1" sx={{ mt: 2 }}>{error}</Typography>}

      {matches.length > 0 && !error && (
        <Stack direction={"column"} spacing={4} mt={4}>
        <TeamGraphs matches={matches}/>
        <TableContainer sx={{ maxWidth: '100%', margin: '0 auto', mt: 4 }}>
          <Table sx={{ minWidth: 650, backgroundColor: "#f57c00" }}>
            <TableHead sx={{ backgroundColor: "#222", color: "white" }}>
              <TableRow>
                <TableCell sx={{ color: "#f57c00", fontWeight: "bold" }}></TableCell>
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
                          "&.MuiTableSortLabel-active": { color: "#f57c00" },
                          "&:hover": { color: "#f57c00" },
                        }}
                      >
                        {column.replace(/([a-z])([A-Z])/g, "$1 $2")}
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
                    backgroundColor: index % 2 === 0 ? "#333" : "#444",
                    "&:hover": { backgroundColor: "#555" },
                  }}
                >
                  <TableCell>
                    <IconButton
                      sx={{ color: "primary", fontSize: 20 }}
                      onClick={() => handleDeleteRow(match.matchNumber)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: "#f57c00" }}>{match.matchNumber}</TableCell>
                  {Object.entries(match).map(
                    ([key, value]) =>
                      key !== "matchNumber" && (
                        <TableCell
                          key={key}
                          sx={{
                            color: "white",
                            whiteSpace: key === "Extra Information" ? "nowrap" : "normal",
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
        </Stack>
      )}

    {deletedRows.length > 0 && (
    <Box sx={{ mt: 4 }}>
        <FormControl fullWidth>
        <InputLabel>Restore Match</InputLabel>
        <Select
            value={restoreMatch}
            onChange={(e) => setRestoreMatch(e.target.value)}
            label="Restore Match"
        >
            {deletedRows.map((match) => (
            <MenuItem key={match.matchNumber} value={match.matchNumber}>
                Match {match.matchNumber}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        {restoreMatch && ( // Only show the restore button if a match is selected
        <Button
            variant="outlined"
            color="white"
            fullWidth
            onClick={handleRestoreRow}
            sx={{ mt: 2 }}
        >
            Restore Selected Match
        </Button>
        )}
  </Box>
)}
    </>
  );
};

export default TeamMatches;
