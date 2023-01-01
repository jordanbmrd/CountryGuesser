import { useState, Dispatch, SetStateAction } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Slide, Stack, TextField, Box, IconButton } from "@mui/material";
import { CgSmileMouthOpen } from "react-icons/cg";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const ChatDialog = (props: ChatDialogProps) => {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(true);

  const handleOpenEmojis = () => {
    setShowEmojis(true);
  }

  const handleCloseEmojis = () => {
    setShowEmojis(false);
  }

  const addEmojiToInput = (emoji: any) => {
    setMessage(message => message + emoji);
  }

  return (
    <Dialog
        open={props.open}
        TransitionComponent={Slide}
        keepMounted
        maxWidth="sm"
        fullWidth
        onClose={() => props.setOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Charles24</Typography>
          <Typography variant="h5">💬</Typography>
        </DialogTitle>
        <DialogContent sx={{ border: "1px solid lightgray", borderRadius: 1, mx: 3, py: 0 }}>
          <Stack pt={2} minHeight={300} justifyContent="flex-end" overflow="scroll">
            <Typography mb={0.5} py={1} px={2} fontSize={13} width="fit-content" bgcolor="lightgray" borderRadius={5} ml="auto">Bonne chance Charles !</Typography>
            <Typography mb={0.5} py={1} px={2} fontSize={13} width="fit-content" bgcolor="#757de8" color="white" borderRadius={5}>Hey :p</Typography>
            <Typography mb={0.5} py={1} px={2} fontSize={13} width="fit-content" bgcolor="#757de8" color="white" borderRadius={5}>Bonne chance à toi aussi Billy !</Typography>
            <Typography mb={0.5} py={1} px={2} fontSize={13} width="fit-content" bgcolor="#757de8" color="white" borderRadius={5}>Bonne chance à toi aussi Billy !</Typography>
            <Typography mb={0.5} py={1} px={2} fontSize={13} width="fit-content" bgcolor="#757de8" color="white" borderRadius={5}>Bonne chance à toi aussi Billy !</Typography>
          </Stack>
        </DialogContent>
        <Box mx={3} my={2}>
          { showEmojis &&
            <Box position="absolute" top={0} right={10}>
              <Picker
              autoFocus
              locale="fr"
              skinTonePosition="none"
              previewPosition="none"
              theme="light"
              data={data}
              onEmojiSelect={addEmojiToInput}
              onClickOutside={handleCloseEmojis}/>
            </Box>
          }
          <TextField value={message} onChange={(e: any) => setMessage(e.target.value)} label="Écrivez-ici" variant="filled" fullWidth sx={{ width: "100%" }} InputProps={{
            endAdornment: (
              <IconButton onClick={handleOpenEmojis}>
                <CgSmileMouthOpen />
              </IconButton>
            )
          }} />
          <Typography mt={2} color="lightgray" fontSize={15} align="center">Vos messages sont chiffrés et ne sont pas enregistrés</Typography>
        </Box>
    </Dialog>
  );
}

interface ChatDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default ChatDialog;