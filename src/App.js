import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import Home from './components/pages/home/Home';
import Profiles from './components/pages/profile/Profiles';
import Navigation from './components/nav/Navigation';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={ <FormDisplay />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/profile" element={ <Profiles />} />
        </Routes>
        
      </Router>

    </AuthProvider>    
  );
}

export default App;
