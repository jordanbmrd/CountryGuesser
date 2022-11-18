import { useState } from "react";
import { Card, Grid, Box, Typography, Alert, Button } from "@mui/material";
import Map from './Map';
import WinnerDialog from './WinnerDialog';
import LoadingBar from '../main/LoadingBar';

const Game = () => {
  const [mysteryCountry, setMysteryCountry] = useState({ name: "", flag: "", code: "" });
  const [selectedCountry, setSelectedCountry] = useState({ name: "", code: "" });
  const [canValidate, setCanValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [winnerDialogVisible, setWinnerDialogVisible] = useState(false); 

  const handleMapLoaded = () => {
    loadRandomCountry();
    setIsLoading(false);
  }

  const loadRandomCountry = () => {
    fetch("https://restcountries.com/v2/all")
    .then(data => data.json())
    .then(data => {
      const randomCountry = data[Math.floor(Math.random() * data.length)];

      console.log(randomCountry);

      setMysteryCountry({
        name: randomCountry.nativeName,
        flag: randomCountry.flag,
        code: randomCountry.alpha2Code.toUpperCase(),
      })
    });
  }

  const handleValidateAnswer = () => {
    console.log(selectedCountry, mysteryCountry);
    if (selectedCountry.code === mysteryCountry.code) {
      // Victoire
      setWinnerDialogVisible(true);
    }
  }

  return (
    <>
      <WinnerDialog
      open={winnerDialogVisible}
      setOpen={setWinnerDialogVisible}
      mysteryCountry={mysteryCountry}
      timer={timer} />
      <LoadingBar visible={isLoading} />
      <Card sx={{ height: "90vh", margin: "30px" }}>
        <Box sx={{ display: "flex" }}>
          <Grid item xs={8} sx={{ mr: 5 }}>
            <Map
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setCanValidate={setCanValidate}
            setTimer={setTimer}
            onLoad={handleMapLoaded}
            winnerDialogVisible={winnerDialogVisible} />
          </Grid>
          <Grid
          item
          spacing={2}
          xs={3}
          pt={5}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="23vw">
            <Grid item>
              <Typography color="lightgray">À toi de jouer !</Typography>
              <Typography variant="h3">Drapeau à trouver</Typography>
              <Typography variant="h6">Temps : {timer}s</Typography>
            </Grid>

            { mysteryCountry.flag && (
              <Grid item>
                <img
                alt="Drapeau"
                src={ mysteryCountry.flag }
                style={{ width: "90%" }} />
              </Grid>
            )}

            <Grid item display="flex" flexDirection="column" alignItems="flex-end" sx={{ mr: 4 }}>
              { selectedCountry && (
                  <Alert severity="info">Vous êtes sur le point de valider votre réponse : <b>{ selectedCountry.name }</b></Alert>
              )}
              <Button
              variant="contained"
              disabled={ !canValidate }
              sx={{ mb: 5, mt: 2, width: "fit-content" }}
              onClick={handleValidateAnswer}>Confirmer ma réponse</Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}

export default Game;