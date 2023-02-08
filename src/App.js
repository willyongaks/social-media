import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import Home from './components/pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import ProfileDetails from './components/pages/profile/ProfileDetails';
import ProfileDash from './components/pages/profile/ProfileDash';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route path="/login" element={ <FormDisplay />} />
          <Route path="/dashboard" element={ <ProfileDash />} />
          <Route path="/details/:name" element={ <ProfileDetails />} />
        </Routes>
        
      </Router>

    </AuthProvider>    
  );
}

export default App;
