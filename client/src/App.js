import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Index from './routes/Index'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Activity from './routes/Activity'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <header className="container">
          <div className="text-center">
            <h1 className=""><Link to="/profile">Binary Upload Boom</Link></h1>
            <span>The #100Devs Social Network</span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity/:id" element={<Activity />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
