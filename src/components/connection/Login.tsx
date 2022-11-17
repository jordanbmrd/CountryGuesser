import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import './Connection.styles.css';

const Login = () => {
  return (
    <Grid>
        <Paper elevation={10} className="connectionPaper">
            <Grid className="connectionGrid">
                <Avatar sx={{ backgroundColor: '#1bbd7e', margin: 'auto' }}>
                    <BsFillLockFill />
                </Avatar>
                <h2>Se connecter</h2>
            </Grid>
            <TextField sx={{ mt: 1, mb: 1 }} label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" fullWidth required />
            <TextField sx={{ mb: 1 }} label="Mot de passe" placeholder="Entrez votre mot de passe" type="password" fullWidth required />
            <FormControlLabel
                label="Se souvenir de moi"
                control={
                    <Checkbox
                        name="checkedRemember"
                        color="primary"
                    /> }
            />
            <Button type="submit" color="primary" variant="contained" className="connectionSubmit" fullWidth>Se connecter</Button>
            <Typography sx={{ textAlign: "center" }}>
                <Link to="/">Mot de passe oublié ?</Link>
            </Typography>
            <Typography>
                Pas encore de compte ?&nbsp;<Link to="/register">S'enregistrer</Link>
            </Typography>
        </Paper>
    </Grid>
  )
}

export default Login;