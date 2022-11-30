import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { BsFillPersonFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from "react-router-dom";
import Navbar from "../main/Navbar";
import "./Dashboard.styles.css";

const Dashboard = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);

  return (
    <>
        <Navbar />

        <Stack
        flexDirection="column"
        justifyContent="space-around"
        sx={{ zIndex: 2, position: "absolute", bottom: 100, right: 100, width: 200 }}>
          <Link style={{ textDecoration: "none" }} to="/game">
            <Typography align="center" className="play-btn">
              <BsFillPersonFill /><br />
              1 joueur
            </Typography>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/game">
            <Typography align="center" className="play-btn">
              <HiUserGroup /><br />
              2 joueurs
            </Typography>
          </Link>
        </Stack>

        <Box sx={{ position: "fixed", width: "100vw" }}>
          <video autoPlay loop muted style={{ width: "100%" }}>
            <source src="world-video.mp4" type="video/mp4" />
          </video>
        </Box>
    </>
  );
}

export default Dashboard;