// Connecte l'utilisateur avec l'API
export const login = async (username: string, password: string) => {
    // TODO Fetch Login User Data!
    const response = {
        username,
        token: "ajkvjreErejfkrej5435grejghr",
    }

    // const token = response.data.token;
    const token = response.token;
    if (token) {
        //localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response));
    }

    // return response.data;
    return response;
}

// Renvoie les données de l'utilisateur si celui-ci est connecté
export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    if (!user) return {}
    return JSON.parse(user);
}