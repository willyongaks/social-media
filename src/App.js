import React from 'react';
import FormDisplay from './components/forms/FormDisplay';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home';
import ProfileDash from './components/pages/profile/ProfileDash';
import Menu from './components/nav/Menu';
import ProfileDetails from './components/pages/profile/ProfileDetails';

function App() {
  return (
   <>
   <Router>
     <Menu />
     <Routes>
       <Route path="/" element={ <FormDisplay />} />
      <Route exact path="/home" element={ <Home />} />
      <Route exact path="/dashboard" element={ <ProfileDash />} />
      <Route exact path="/details/:name" element={ <ProfileDetails />} />
     </Routes>
     
   </Router>
   </>
  )
}

export default App

