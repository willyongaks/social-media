import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import Home from './components/pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import ProfileDetails from './components/pages/profile/ProfileDetails';
import ProfileDash from './components/pages/profile/ProfileDash';
import { useContext } from 'react';


function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute />
      </Router>
    </AuthProvider>    
  );
}

function PrivateRoute() {
  const [ auth ]  = useContext(AuthContext);

  if (!auth) {
    return (
      <Routes>
        <Route path="/" element={<FormDisplay />} />
        <Route path="/login" element={<FormDisplay />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route exact path="/" element={ <Home />} />
      <Route path="/dashboard" element={ <ProfileDash />} />
      <Route path="/details/:name" element={ <ProfileDetails />} />
    </Routes>
  );
}

export default App;
