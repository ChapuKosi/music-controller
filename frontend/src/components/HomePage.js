import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

import { 
  Grid, 
  Button, 
  ButtonGroup, 
  Typography 
} from "@mui/material";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  Navigate 
} from "react-router-dom";


export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  const renderHomePage = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup variant="contained" color="primary">
          <Button component={Link} to="/join" color="primary">
            Join a Room
          </Button>
          <Button component={Link} to="/create" color="secondary">
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            roomCode ? ( <Navigate to={`/room/${roomCode}`} replace={true} /> ) : ( renderHomePage() )           
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route 
          path="/room/:roomCode" 
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
}

