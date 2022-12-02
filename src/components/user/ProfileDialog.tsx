import { Button, Typography, Dialog, DialogContent, DialogActions, IconButton } from "@mui/material";
import { AiFillCloseCircle } from 'react-icons/ai';
import DialogTitle from "./DialogTitle";

const ProfileDialog = (props: ProfileDialogProps) => {
  return (
      <Dialog
        sx={{ p: 2 }}
        onClose={props.handleClose}
        open={props.open}
      >
        <DialogTitle onClose={props.handleClose}>
          Profil
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

interface ProfileDialogProps {
  handleClose: () => void;
  open: boolean;
}

export default ProfileDialog;