import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Board = (props: BoardProps): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: "orange" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Nom du joueur</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Parties gagnées</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Ratio (G/P)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.wonGames}</TableCell>
              <TableCell align="right">{row.ratio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface BoardProps {
  rows: { name: string, wonGames: number, ratio: number }[];
}

export default Board;