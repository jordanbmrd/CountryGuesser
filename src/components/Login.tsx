import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import { BsFillLockFill } from "react-icons/bs";
import './Login.css';

const Login = () => {
  return (
    <Grid>
        <Paper elevation={10} className="loginPaper">
            <Grid className="loginGrid">
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
            <Button type="submit" color="primary" variant="contained" className="loginSubmit" fullWidth>Se connecter</Button>
            <Typography>
                <Link href="#">Mot de passe oublié ?</Link>
            </Typography>
            <Typography>
                Pas encore de compte ?<Link href="#">S'enregistrer</Link>
            </Typography>
        </Paper>
    </Grid>
  )
}

export default Login;