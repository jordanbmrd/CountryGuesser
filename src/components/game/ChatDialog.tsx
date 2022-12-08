import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Button } from "@mui/material";

const ChatDialog = (props: ChatDialogProps) => {
  return (
    <Dialog
        open={props.open}
        TransitionComponent={Slide}
        keepMounted
        onClose={() => props.setOpen(false)}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Disagree</Button>
        <Button onClick={() => props.setOpen(false)}>Agree</Button>
        </DialogActions>
    </Dialog>
  );
}

interface ChatDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default ChatDialog;