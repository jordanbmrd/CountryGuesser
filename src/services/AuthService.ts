// Connexion utilisateur
export const login = async (nickname_email: string, password: string) => {
    const response = await (await fetch("https://api.countryguesser.deletesystem32.fr/login", {
        method: "post",
        body: JSON.stringify({
            nickname_email,
            password,
        })
    })).json();

    const id = response.id;
    if (id) localStorage.setItem('user', JSON.stringify(response));

    return response;
}

// Création compte utilisateur
export const register = async (nickname: string, email: string, password: string, password_confirmation: string) => {
    const response = await (await fetch("https://api.countryguesser.deletesystem32.fr/register", {
        method: "post",
        body: JSON.stringify({
            nickname,
            email,
            password,
            password_confirmation,
        })
    })).json();

    const id = response.id;
    if (id) localStorage.setItem('user', JSON.stringify(response));

    return response;
}

// Renvoie les données de l'utilisateur si celui-ci est connecté
export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    if (!user) return {}
    return JSON.parse(user);
}