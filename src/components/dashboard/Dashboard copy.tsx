import { Button, Card, Grid, CardContent, CardActions, Container, Typography } from "@mui/material";
import Navbar from "../main/Navbar";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
        <Navbar />

        <Container sx={{ mt: 5 }}>
          <Grid
          container
          wrap="wrap-reverse">
            <Grid item xs={10}>
              <Grid sx={{ ml: 4 }}>
                <Typography
                variant="h4"
                mb={5}>
                  Statistiques
                </Typography>
                <Grid
                container
                spacing={3}>
                  <Grid item>
                    <Card sx={{ width: "fit-content", textAlign: "center" }}>
                      <CardContent>
                        <Typography variant="h3" color="green">6</Typography>
                        <Typography mt={1.5}>parties gagnées</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card sx={{ width: "fit-content", textAlign: "center" }}>
                      <CardContent>
                        <Typography variant="h3" color="orange">24</Typography>
                        <Typography mt={1.5}>parties perdues</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card sx={{ width: "fit-content", textAlign: "center" }}>
                      <CardContent>
                        <Typography variant="h3" color="blue">46m</Typography>
                        <Typography mt={1.5}>passées sur le jeu</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
              item
              sx={{ ml: 4, mt: 8 }}>
                <Typography color="lightgray">CountryGuesser</Typography>
                <Typography variant="h4" mb={3}>Comment jouer ?</Typography>

                <Typography variant="body1" sx={{ maxWidth: "90%" }}>
                  Bienvenue dans CountryGuesser !<br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate omnis natus, blanditiis nisi nam fugiat eveniet dicta provident iste adipisci nostrum explicabo odio laudantium? Sequi iure doloremque totam voluptate et!
                </Typography>
              </Grid>
            </Grid>

            <Grid
            item
            xs={2}
            display="flex"
            sx={{
              minWidth: { xs: "100%", md: 130 },
              flexDirection: { xs: "row", md: "column" },
              ml: { xs: 4, md: 0 },
              mb: { xs: 4 }
            }}>
              <Card sx={{ mb: { md: 2 }, mr: { xs: 2 }, minWidth: 200, p: 1 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <BsFillPersonFill size={70} />
                  <Typography variant="h6">1 joueur</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Link style={{ textDecoration: 'none' }} to="/game">
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
                  <Link style={{ textDecoration: 'none' }} to="/game">
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