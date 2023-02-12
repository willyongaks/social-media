import React, { useEffect, useState } from 'react';
import { fetchData } from './AuthProfile';
import '../../../styles/profile/profileDash.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function ProfileDash() {
  const [authProfile, setAuthProfile] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchData(setAuthProfile,setLoading,setError)
    
  }, [])
  console.log(authProfile)

  if(loading){
    return <p>Loading....</p>
  }
  if(error){
    return <p>{error.massage}</p>
  }

  return (
    <section className='dashboard-container'>
        <Container>
      <Row>
        <Col sm={7}>
          <div className='db1'>
            <div className='dashboard-banner'>
              <img src={authProfile.banner || 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80'} alt={authProfile.banner} />
              <button>Update banner</button>
            </div>
            <div>
              <button className='dashboard-avatar'>
                <img src={authProfile.avatar || 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'} alt={authProfile.avatar} />
              </button>
            </div>
          </div>
          
        </Col>
        <Col sm={4}>
          <div>
            <h4>What to display ?</h4>
          </div>
        </Col>
      </Row>
    </Container> 
  </section>
    
    
  )
}

export default ProfileDash