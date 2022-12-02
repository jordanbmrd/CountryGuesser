import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BsFillPersonFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from "react-router-dom";
import Navbar from "../main/Navbar";
import "./Dashboard.styles.css";

const Dashboard = () => {
  // Changement de la couleur de fond
  useEffect(() => {document.body.style.backgroundColor = "black"}, []);

  return (
    <>
        <Navbar />

        <Stack
        alignItems="center"
        width="100%"
        sx={{ zIndex: 2, position: "absolute", bottom: 50 }}>
          <Typography
          variant="h5"
          color="white"
          mb={2}
          fontFamily="'Oswald', sans-serif">Lancer une partie</Typography>
          <Stack
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ width: 500 }}>
            <Link style={{ textDecoration: "none" }} to="/game">
              <Typography align="center" className="play-btn">
                <BsFillPersonFill />&nbsp;
                1 joueur
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/game">
              <Typography align="center" className="play-btn">
                <HiUserGroup />&nbsp;
                2 joueurs
              </Typography>
            </Link>
          </Stack>
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