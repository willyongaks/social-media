import React from 'react';
import '../../../App.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';
import AuthProfile from '../profile/AuthProfile';
import Profiles from '../profile/Profiles';


function Home() {
  return (
      <Row>
        <Col className='col-xl-2 col-md-3 col-12 '><Profiles />
        </Col>
        
        <Col className='Post-container col-xl-8 col-md-9 col-12'>
          <Posts />
        </Col>
        <Col className='col-xl-2 col-md-3 col-12 '><AuthProfile />
        <Profiles />
        </Col>
      </Row>
    
  )
}

export default Home