import { Container, Typography } from "@mui/material";
import Board from './Board';
import Navbar from '../main/Navbar';

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

const Loaderboards = () => {
  return (
    <>
        <Navbar />
        <Container sx={{ mb: 10 }}>
            <Typography variant="h4" mb={3} mt={5}>Classement - Mode 1 joueur</Typography>
            <Board rows={rows} />
            <Typography variant="h4" mb={3} mt={5}>Classement - Mode 2 joueurs</Typography>
            <Board rows={rows} />
        </Container>
    </>
  );
}

export default Loaderboards;