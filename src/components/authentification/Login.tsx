import { useState } from "react";
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import './Authentification.styles.css';

const Login = () => {
    const [formValues, setFormValues] = useState({ username: "", password: "", rememberMe: false });

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

    const handleSubmit = (e: any): void => {
        e.preventDefault();

        fetch("http://localhost:8888/countryguesser-backend/login.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        })
        .then(data => console.log(data.text()))
        .catch(err => console.log(err));
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