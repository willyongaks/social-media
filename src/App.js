import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import Home from './components/pages/home/Home';
import Navigation from './components/nav/Navigation';
import { AuthProvider } from './context/AuthContext';
import ProfileDetails from './components/pages/profile/ProfileDetails';
import ProfileDash from './components/pages/profile/ProfileDash';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={ <FormDisplay />} />
          <Route exact path="/layout" element={ <Layout />} />
          <Route exact path="/home" element={ <Home />} />
          <Route path="/dashboard" element={ <ProfileDash />} />
          <Route path="/details/:name" element={ <ProfileDetails />} />
        </Routes>
        
      </Router>

    </AuthProvider>    
  );
}

export default App;
