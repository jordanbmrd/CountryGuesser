import { useState, useEffect } from "react";
import { Box, Typography, Alert, Button, Stack } from "@mui/material";
import Map from './Map';
import WinnerDialog from './WinnerDialog';
import LoserDialog from './LoserDialog';
import LoadingBar from '../main/LoadingBar';
import Loader from "../main/Loader";
import { secondsToTime } from "../../utils/time.utils";
import '../../animations/shake.animation.css';

const Game = () => {
  const [mysteryCountry, setMysteryCountry] = useState({ name: "", flag: "", code: "", latLng: [] });
  const [selectedCountry, setSelectedCountry] = useState({ name: "", code: "" });
  const [canValidate, setCanValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [winnerDialogVisible, setWinnerDialogVisible] = useState(false);
  const [loserDialogVisible, setLoserDialogVisible] = useState(false);
  const [losedGame, setLosedGame] = useState(false);
  const [leftClues, setLeftClues] = useState(0);  // Initialisé au chargement de la Map à 3
  const [errors, setErrors] = useState(0);
  const [shake, setShake] = useState(false);

  // Changement de la couleur de fond
  useEffect(() => {document.body.style.backgroundColor = "#efeff0"}, []);

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
      setShake(true);
    }
  }

  const handleLeave = () => {
    setLosedGame(true);
  }

  const handleReplay = () => {
    // TODO: Réinitialiser tous les states à 0, y compris ceux de map
    // Solution temporaire
    window.location.reload();
  }

  return (
    <>
      <WinnerDialog
      open={winnerDialogVisible}
      mysteryCountry={mysteryCountry}
      errors={errors}
      timer={timer}
      onReplay={handleReplay} />
      <LoserDialog
      open={loserDialogVisible}
      mysteryCountry={mysteryCountry} />
      <LoadingBar visible={isLoading} />

      <Box
      sx={{ height: "90vh", margin: "30px", borderRadius: 5, bgcolor: "white" }}
      overflow="hidden"
      className={ shake ? 'shake' : '' }
      onAnimationEnd={() => setShake(false)}>
        <Stack
        direction="row">
          <Box mr={5}>
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
          </Box>
          <Stack
          pt={5}
          direction="column"
          justifyContent="space-between"
          overflow="hidden">
            <Box>
              <Typography color="lightgray">À toi de jouer !</Typography>
              <Typography variant="h3">Drapeau à trouver</Typography>
              <Typography variant="h6">Temps : {secondsToTime(timer)}s</Typography>
              { errors ? <Typography variant="h6">Erreurs : {errors}</Typography> : null }
            </Box>

            { mysteryCountry.flag ? (
              <Box>
                <img
                alt="Drapeau"
                src={ mysteryCountry.flag }
                style={{ width: "90%", border: "1px solid lightgray" }} />
              </Box>
            ) : (
              <Loader />
            )}

            <Stack direction="column" alignItems="flex-end" mr={4}>
              { selectedCountry.name && (
                  <Alert severity="info">Vous êtes sur le point de valider votre réponse : <b>{ selectedCountry.name }</b></Alert>
              )}

              <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              flexWrap="wrap"
              width="100%"
              mt={2}
              mb={5}>
                <Button
                variant="outlined"
                onClick={handleLeave}>
                  Abandonner
                </Button>
                <Button
                variant="contained"
                disabled={ !canValidate }
                onClick={handleValidateAnswer}>Confirmer ma réponse</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Game;