import { Button, Card, Grid, CardContent, CardActions, Container, Typography } from "@mui/material";
import Navbar from "../main/Navbar";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
        <Navbar />

        <Container sx={{ mt: 5 }}>
          <Grid container
          sx={{ ml: 5 }}
          >
            <Grid item xs={9}>
              <Typography color="lightgray" mt={3}>CountryGuesser</Typography>
              <Typography variant="h4" mb={5}>Comment jouer ?</Typography>

              <Typography variant="body1" sx={{ maxWidth: "90%" }}>
                Bienvenue dans CountryGuesser !<br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate omnis natus, blanditiis nisi nam fugiat eveniet dicta provident iste adipisci nostrum explicabo odio laudantium? Sequi iure doloremque totam voluptate et!
              </Typography>
            </Grid>

            <Grid
            item
            xs={2}
            flexDirection="column">
              <Card sx={{ mb: 2, minWidth: 200, p: 1 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <BsFillPersonFill size={70} />
                  <Typography variant="h6">1 joueur</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Link to="/game">
                    <Button variant="contained">Lancer la partie</Button>
                  </Link>
                </CardActions>
              </Card>

              <Card sx={{ minWidth: 200, p: 1 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <BsFillPeopleFill size={70} />
                  <Typography variant="h6">2 joueurs</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Link to="/game">
                    <Button variant="contained">Lancer la partie</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default Dashboard;