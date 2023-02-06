import React from 'react';
import '../../../App.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';
import AuthProfile from '../profile/AuthProfile';
import Profiles from '../profile/Profiles';
import CreatePost from '../posts/CreatePost';


function Home() {
  return (
      <Row>
        <Col className='Post-container col-xl-8 col-md-8 col-12'>
          <Posts />
        </Col>
        <Col className='col-xl-2 col-md-3 col-12 '>
        <CreatePost />
        <Profiles />
        </Col>
      </Row>
    
  )
}

export default Home