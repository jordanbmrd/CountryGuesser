import { useState, useEffect, useContext, useCallback } from "react";
import { Box, Typography, Alert, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import Map from './Map';
import WinnerDialog from './dialogs/WinnerDialog';
import LoserDialog from './dialogs/LoserDialog';
import LoadingBar from '../main/LoadingBar';
import ChatDialog from './dialogs/ChatDialog';
import Waiting from "./waiting/Waiting";
import Loader from "../main/Loader";
import { secondsToTime } from "../../utils/time.utils";
import { isAuthenticated } from "../../services/AuthService";
import UserContext from "../../services/UserContext";
import '../../animations/shake.animation.css';
import { configure } from "@testing-library/react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ReadyState } from "react-use-websocket";

const Game = () => {
  const { gameMode } = useParams();

  const [mysteryCountry, setMysteryCountry] = useState({ name: "", flag: "", code: "", latLng: [] });
  const [selectedCountry, setSelectedCountry] = useState({ name: "", code: "" });
  const [canValidate, setCanValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [winner, setWinner] = useState("");
  const [winnerDialogVisible, setWinnerDialogVisible] = useState(false);
  const [loserDialogVisible, setLoserDialogVisible] = useState(false);
  const [losedGame, setLosedGame] = useState(false);
  const [leftClues, setLeftClues] = useState(0);  // Initialisé au chargement de la Map à 3
  const [errors, setErrors] = useState(0);
  const [shake, setShake] = useState(false);

  // TODO : à transformer en "Bientôt"
  const [chatOpen, setChatOpen] = useState(false);

  const [foundPlayers, setFoundPlayers] = useState(false);

  const [socketUrl, setSocketUrl] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    document.body.style.backgroundColor = "#efeff0";  // Changement de la couleur de fond
    setCurrentUser(isAuthenticated());
  }, []);

  useEffect(() => {
    if (currentUser.credential) {
      setSocketUrl(`ws://ws.countryguesser.deletesystem32.fr?playerCredential=${ currentUser.credential }&roomSize=2&maxRounds=7`);
    }
  }, [currentUser]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log("sendingMsg ::: ", readyState, ReadyState.OPEN, connectionStatus);
      fetchRandomCountry().then(randomCountry => {
        setMysteryCountry(randomCountry);
        console.log("randomCountry ::: ", randomCountry);

        sendMessage(JSON.stringify({
          type: "roundData",
          ...randomCountry,
        }));
      });
    }
  }, [connectionStatus]);

  const handleMapLoaded = () => {
    setIsLoading(false);
  }

  useEffect(() => console.log(connectionStatus), [connectionStatus]);
  useEffect(() => console.log(lastMessage && JSON.parse(lastMessage.data)), [lastMessage]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      console.log("Received ::: ", data);

      switch(data.informationType) {
        case "roomFull":  // Tous les joueurs trouvés
          setFoundPlayers(true);
          break;
        case "roundCreated":
          console.log("Setting mystery country");
          setMysteryCountry({
            name: data.name,
            flag: data.flag,
            code: data.code,
            latLng: data.latLng,
          });
          break;
        case "wrongAnswer":
          setErrors(errors => errors + 1);
          setShake(true);
          break;
        case "roundOver":
          setWinner(data.roundWinnerNickname);
          if (data.roundWinnerNickname === currentUser.nickname) {  
            setWinnerDialogVisible(true);
          }
          else {
            setLoserDialogVisible(true);
          }
          break;
        default: break;
      }
      if (data.informationType === "roomFull") {  // Tous les joueurs trouvés
        setFoundPlayers(true);
      }
    }
  }, [lastMessage]);

  const fetchRandomCountry = (): Promise<any> => {
    return fetch("https://restcountries.com/v2/all/")
    .then(data => data.json())
    .then(data => {
      const randomCountry = data[Math.floor(Math.random() * data.length)];

      return {
        name: randomCountry.translations.fr,
        flag: randomCountry.flag,
        code: randomCountry.alpha2Code.toUpperCase(),
        latLng: randomCountry.latlng,
      };
    });
  }

  const handleValidateAnswer = () => {
    sendMessage(JSON.stringify({
      type: "playerResponse",
      playerResponse: selectedCountry.code,
    }));
  }

  const handleLeave = () => {
    setLosedGame(true);
  }

  const handleReplay = () => {
    // TODO: Réinitialiser tous les states à 0, y compris ceux de map
    // Solution temporaire
    window.location.reload();
  }

  useEffect(() => {
    console.log(mysteryCountry);
  }, [mysteryCountry]);

  return foundPlayers ? (
    <>
      <ChatDialog
      open={chatOpen}
      setOpen={setChatOpen} />
      <WinnerDialog
      open={winnerDialogVisible}
      mysteryCountry={mysteryCountry}
      errors={errors}
      timer={timer}
      onReplay={handleReplay} />
      <LoserDialog
      open={loserDialogVisible}
      mysteryCountry={mysteryCountry}
      onReplay={handleReplay}
      winnerName={winner} />
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
            setLoserDialogVisible={setLoserDialogVisible}
            isMultiplayer={gameMode === "multiplayer"}
            setChatOpen={setChatOpen} />
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
  ) : (
    <Waiting foundPlayers={foundPlayers} />
  );
}

export default Game;