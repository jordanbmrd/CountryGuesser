import { ReactElement, forwardRef, Ref } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const evalTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60;
    
    return {
        minutes,
        seconds
    };
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WinnerDialog = (props: WinnerDialogProps) => {
    const { name } = props.mysteryCountry;
    const { minutes, seconds } = evalTime(props.timer);

  return (
    <>
        <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ zIndex: 1500, display: props.open ? "block" : "none" }} />
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogContent sx={{ m: "auto" }}>
            <img src="confettis.png" alt="Confettis" width="150" />
        </DialogContent>
        <DialogTitle>
            Bravo ! Vous avez gagné la partie !<br />
            Le pays était : <b>{ name && name }</b><br />
            Temps passé : <b>{ minutes }min { seconds }s</b><br />
            { props.errors > 0 ?
              <>Erreurs : <b>{ props.errors }</b></> :
              <>Aucune erreur !</>
            }
        </DialogTitle>
        <DialogActions>
            <Link style={{ textDecoration: 'none' }} to="/">
                <Button>Revenir à l'accueil</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/game">
                <Button variant="contained">Rejouer</Button>
            </Link>
        </DialogActions>
        </Dialog>
    </>
  );
}

interface WinnerDialogProps {
    open: boolean;
    mysteryCountry: { name: string, flag: string, code: string, latLng: number[] };
    errors: number;
    timer: number;
}

export default WinnerDialog;