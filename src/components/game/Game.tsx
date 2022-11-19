import { useState } from "react";
import { Card, Grid, Box, Typography, Alert, Button } from "@mui/material";
import Map from './Map';
import WinnerDialog from './WinnerDialog';
import LoserDialog from './LoserDialog';
import LoadingBar from '../main/LoadingBar';

const Game = () => {
  const [mysteryCountry, setMysteryCountry] = useState({ name: "", flag: "", code: "", latLng: [] });
  const [selectedCountry, setSelectedCountry] = useState({ name: "", code: "" });
  const [canValidate, setCanValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [winnerDialogVisible, setWinnerDialogVisible] = useState(false);
  const [loserDialogVisible, setLoserDialogVisible] = useState(false);
  const [losedGame, setLosedGame] = useState(false);
  const [leftClues, setLeftClues] = useState(0);  // Initialisé au chargement de la Map à 2
  const [errors, setErrors] = useState(0);

  const handleMapLoaded = () => {
    loadRandomCountry();
    setIsLoading(false);
  }

  const loadRandomCountry = () => {
    fetch("https://restcountries.com/v2/all/")
    .then(data => data.json())
    .then(data => {
      const randomCountry = data[Math.floor(Math.random() * data.length)];

      setMysteryCountry({
        name: randomCountry.translations.fr,
        flag: randomCountry.flag,
        code: randomCountry.alpha2Code.toUpperCase(),
        latLng: randomCountry.latlng,
      })
    });
  }

  const handleValidateAnswer = () => {
    if (selectedCountry.code === mysteryCountry.code) {
      // Bon pays validé
      setWinnerDialogVisible(true);
    }
    else {
      // Mauvais pays validé
      setErrors(errors => errors + 1);
    }
  }

  const handleLeave = () => {
    setLosedGame(true);
  }

  return (
    <>
      <WinnerDialog
      open={winnerDialogVisible}
      mysteryCountry={mysteryCountry}
      errors={errors}
      timer={timer} />
      <LoserDialog
      open={loserDialogVisible}
      mysteryCountry={mysteryCountry} />
      <LoadingBar visible={isLoading} />
      <Card sx={{ height: "90vh", margin: "30px" }}>
        <Box sx={{ display: "flex" }}>
          <Grid item xs={8} sx={{ mr: 5 }}>
            <Map
            losedGame={losedGame}
            leftClues={leftClues}
            mysteryCountry={mysteryCountry}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setCanValidate={setCanValidate}
            setTimer={setTimer}
            setLeftClues={setLeftClues}
            onLoad={handleMapLoaded}
            winnerDialogVisible={winnerDialogVisible}
            setLoserDialogVisible={setLoserDialogVisible} />
          </Grid>
          <Grid
          item
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
                style={{ width: "90%", border: "1px solid lightgray" }} />
              </Grid>
            )}

            <Grid item display="flex" flexDirection="column" alignItems="flex-end" sx={{ mr: 4 }}>
              { selectedCountry.name && (
                  <Alert severity="info">Vous êtes sur le point de valider votre réponse : <b>{ selectedCountry.name }</b></Alert>
              )}

              <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 5, mt: 2 }}>
                <Button variant="outlined" onClick={handleLeave}>
                  Abandonner
                </Button>
                <Button
                variant="contained"
                disabled={ !canValidate }
                onClick={handleValidateAnswer}>Confirmer ma réponse</Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}

export default Game;