import React, { useEffect, useState } from 'react';
import { fetchData } from './AuthProfile';
import '../../../styles/profile/profileDash.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UpdateBanner from './UpdateBanner';
import AuthPosts from './AuthPosts';
import CreatePost from '../posts/CreatePost';


function ProfileDash() {
  const [authProfile, setAuthProfile] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchData(setAuthProfile,setLoading,setError)
    
  }, [setAuthProfile,setLoading,setError])
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
        <Col sm={10}>
          <div className='dbh1'>
            <div className='dashboard-banner'>
              <img src={authProfile.banner || 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80'} alt={authProfile.banner} />
             <UpdateBanner className='update-banner-button'/>
            </div>
            <div className='dbh-prof-details'>
              <div>
                <button className='dashboard-avatar'>
                  <img src={authProfile.avatar || 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'} alt={authProfile.avatar} />
                </button>
              </div>
              <div className='dashboard-details'>
                <div className='dash-name'>
                  <CreatePost />
                </div>
                <div className='dash-count'>
                  <div className='posts'>
                    <p>Post 
                      <span>{authProfile._count.posts}</span>
                    </p>
                  </div>
                  <div className='Following'>
                    <p>Following 
                      <span>{authProfile._count.following}</span>
                    </p>
                  </div>
                  <div className='Followers'>
                    <p>Followers 
                      <span>{authProfile._count.followers}</span>
                    </p>
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </div>
          <div>
            <AuthPosts />
          </div>
          
        </Col>
        
      </Row>
    </Container> 
  </section>
    
    
  )
}

export default ProfileDash