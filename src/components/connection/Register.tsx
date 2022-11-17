import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import './Connection.styles.css';

const Register = () => {
  return (
    <Grid>
        <Paper elevation={10} className="connectionPaper">
            <Grid className="connectionGrid">
                <Avatar sx={{ backgroundColor: '#1bbd7e', margin: 'auto' }}>
                    <BsFillLockFill />
                </Avatar>
                <h2>Créer mon compte</h2>
            </Grid>
            <TextField sx={{ mt: 1, mb: 1 }} label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" fullWidth required />
            <TextField sx={{ mb: 1 }} label="Email" placeholder="Entrez votre email" fullWidth required />
            <TextField sx={{ mb: 1 }} label="Mot de passe" placeholder="Entrez votre mot de passe" type="password" fullWidth required />
            <TextField sx={{ mb: 1 }} label="Confirmer mot de passe" placeholder="Confirmez votre mot de passe" type="password" fullWidth required />
            <Button type="submit" color="primary" variant="contained" className="connectionSubmit" fullWidth>Créer</Button>
            <Typography>
                Déjà inscrit ?&nbsp;<Link to="/login">Se connecter</Link>
            </Typography>
        </Paper>
    </Grid>
  )
}

export default Register