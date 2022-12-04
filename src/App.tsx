import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserProvider } from './services/UserContext';
import Login from './components/authentification/Login';
import Register from './components/authentification/Register';
import Dashboard from './components/dashboard/Dashboard';
import Game from './components/game/Game';
import Leaderboards from './components/leaderboards/Leaderboards';
import About from './components/about/About';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/game" element={ <Game /> } />
          <Route path="/leaderboards" element={ <Leaderboards /> } />
          <Route path="/about" element={ <About /> } />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
