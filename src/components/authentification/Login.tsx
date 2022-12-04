import { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import { login } from "../../services/AuthService";
import './Authentification.styles.css';

const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ username: "", password: "", rememberMe: false });

    // Changement de la couleur de fond
    useEffect(() => {document.body.style.backgroundColor = "#efeff0"}, []);

    const handleInputChange = (e: any): void => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleCheckboxChange = (e: any): void => {
        const { name, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: checked,
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await login(formValues.username, formValues.password);
            navigate('/');
        } catch (err) {
            console.error("Erreur lors de la connexion", err);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <Grid container
        sx={{ height: "100vh", width: "70%", m: "auto" }}
        justifyContent="space-around"
        alignItems="center">
            <Grid item>
                <img src="logo-light.png" alt="Country Guesser Logo" width={500} />
            </Grid>
            
            <Grid item>
                <Paper elevation={10} className="connectionPaper">
                    <Grid className="connectionGrid">
                        <Avatar sx={{ backgroundColor: '#1bbd7e', margin: 'auto' }}>
                            <BsFillLockFill />
                        </Avatar>
                        <h2>Se connecter</h2>
                    </Grid>
                    <TextField value={formValues.username} onChange={handleInputChange} name="username" sx={{ mt: 1, mb: 1 }} label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" fullWidth required />
                    <TextField value={formValues.password} onChange={handleInputChange} name="password" sx={{ mb: 1 }} label="Mot de passe" placeholder="Entrez votre mot de passe" type="password" fullWidth required />
                    <FormControlLabel
                        label="Se souvenir de moi"
                        control={
                            <Checkbox
                                checked={formValues.rememberMe}
                                onChange={handleCheckboxChange}
                                name="rememberMe"
                                color="primary"
                            /> }
                    />
                    <Button type="submit" color="primary" variant="contained" className="connectionSubmit" fullWidth>Se connecter</Button>
                    <Typography sx={{ textAlign: "center" }}>
                        <Link style={{ textDecoration: 'none' }} to="/">Mot de passe oublié ?</Link>
                    </Typography>
                    <Typography>
                        Pas encore de compte ?&nbsp;<Link style={{ textDecoration: 'none' }} to="/register">S'enregistrer</Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </form>
  )
}

export default Login;