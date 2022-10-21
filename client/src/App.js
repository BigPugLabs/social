import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Index from './routes/Index'
import Profile from './routes/Profile'
import Activity from './routes/Activity'

function App() {
  return (
    <Router>
      <>
        <header className="container">
          <div className="text-center">
            <h1 className=""><Link to="/profile">Binary Upload Boom</Link></h1>
            <span>The #100Devs Social Network</span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
