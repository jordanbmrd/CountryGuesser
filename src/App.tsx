import './App.css';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/authentification/Login';
import Register from './components/authentification/Register';
import Dashboard from './components/dashboard/Dashboard';
import Game from './components/game/Game';
import Leaderboards from './components/leaderboards/Leaderboards';
import About from './components/about/About';

function App() {
  const [user, setUser] = useState({ username: "dorit75", email: "dorit75@gmail.com", date: "02/12/2022" });

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/game" element={ <Game /> } />
        <Route path="/leaderboards" element={ <Leaderboards /> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
    </Router>
  );
}

export default App;
