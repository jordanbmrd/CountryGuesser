import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Board from './Board';
import Navbar from '../main/Navbar';
import FabMenu from "../main/FabMenu";

const createData = (
    name: string,
    wonGames: number,
    ratio: number,
  ) => {
    return { name, wonGames, ratio };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
  ];

const Leaderboards = () => {
  // Changement de la couleur de fond
  useEffect(() => {document.body.style.backgroundColor = "black"}, []);

  return (
    <>
        <Navbar />
        <Container sx={{ mb: 10, width: 1000 }}>
            <Typography color="white" variant="h4" mb={3} mt={5}>Classement - Mode 1 joueur</Typography>
            <Board rows={rows} />
            <Typography color="white" variant="h4" mb={3} mt={5}>Classement - Mode 2 joueurs</Typography>
            <Board rows={rows} />
        </Container>

        <FabMenu />
    </>
  );
}

export default Leaderboards;