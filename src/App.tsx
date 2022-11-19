import { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/connection/Login';
import Register from './components/connection/Register';
import Dashboard from './components/dashboard/Dashboard';
import Game from './components/game/Game';
import Leaderboards from './components/leaderboards/Loaderboards';

function App() {
  const [connected, isConnected] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/game" element={ <Game /> } />
        <Route path="/leaderboards" element={ <Leaderboards /> } />
      </Routes>
    </Router>
  );
}

export default App;
