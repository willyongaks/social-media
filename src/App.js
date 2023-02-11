import './App.css';
import React from 'react';
import FormDisplay from './components/forms/FormDisplay';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Home from './components/pages/home/Home';
// import ProfileDash from './components/pages/profile/ProfileDash';
import Menu from './components/nav/Menu';

function App() {
  return (
   <>
   <Router>
     <Routes>
      <Route exact path="/" element={ <FormDisplay />} />
      <Route path="/home" element={ <Menu />} />
      </Routes>
   </Router>

   </>
  )
}

export default App














































// import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
// import './App.css';
// import FormDisplay from './components/forms/FormDisplay';
// import Home from './components/pages/home/Home';
// import { AuthProvider } from './context/AuthContext';
// import AuthContext from './context/AuthContext';
// import ProfileDetails from './components/pages/profile/ProfileDetails';
// import ProfileDash from './components/pages/profile/ProfileDash';
// import { useContext } from 'react';
// import Navigation from './components/nav/Navigation';



// export default App;
