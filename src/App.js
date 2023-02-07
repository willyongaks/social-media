import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import Home from './components/pages/home/Home';
import Profiles from './components/pages/profile/Profiles';
import Navigation from './components/nav/Navigation';
import { AuthProvider } from './context/AuthContext';
import ProfileDetails from './components/pages/profile/ProfileDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={ <FormDisplay />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/profile" element={ <Profiles />} />
          <Route path="/details/:name" element={ <ProfileDetails />} />
        </Routes>
        
      </Router>

    </AuthProvider>    
  );
}

export default App;
