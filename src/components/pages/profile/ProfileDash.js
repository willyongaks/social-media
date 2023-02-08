import React from 'react';
import AuthProfile from './AuthProfile';


function ProfileDash({ AuthProfile }) {
  return (
    <div>
      <h1>Profile Dashboard</h1>
      <p>Name: {AuthProfile.name}</p>
      <p>Email: {AuthProfile.email}</p>
    </div>
  )
}

export default ProfileDash