import { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";
import './Connection.styles.css';

const Register = () => {
    const [formValues, setFormValues] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    const handleInputChange = (e: any): void => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault();

        fetch("http://localhost:8888/countryguesser-backend/register.php", {
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
                <Paper elevation={5} sx={{ borderRadius: 3 }} className="connectionPaper">
                    <Grid className="connectionGrid">
                        <Avatar sx={{ backgroundColor: '#1bbd7e', margin: 'auto' }}>
                            <BsFillLockFill />
                        </Avatar>
                        <h2>Créer mon compte</h2>
                    </Grid>
                    <TextField value={formValues.username} onChange={handleInputChange} name="username" sx={{ mt: 1, mb: 1 }} label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" fullWidth required />
                    <TextField value={formValues.email} onChange={handleInputChange} name="email" sx={{ mb: 1 }} label="Email" placeholder="Entrez votre email" fullWidth required />
                    <TextField value={formValues.password} onChange={handleInputChange} name="password" sx={{ mb: 1 }} label="Mot de passe" placeholder="Entrez votre mot de passe" type="password" fullWidth required />
                    <TextField value={formValues.confirmPassword} onChange={handleInputChange} name="confirmPassword" sx={{ mb: 1 }} label="Confirmer mot de passe" placeholder="Confirmez votre mot de passe" type="password" fullWidth required />
                    <Button type="submit" color="primary" variant="contained" className="connectionSubmit" fullWidth>Créer</Button>
                    <Typography>
                        Déjà inscrit ?&nbsp;<Link style={{ textDecoration: 'none' }} to="/login">Se connecter</Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </form>
  )
}

export default Register