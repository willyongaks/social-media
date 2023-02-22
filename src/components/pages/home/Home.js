import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';
import Profiles from '../profile/Profiles';
import CreatePost from '../posts/CreatePost';
import '../../../App.css';


function Home() {
  return (
    <>
      <Row col-12>
        <Col className='Post-container xs={12} md={8}'>
          <Posts />
        </Col>
        <Col className='col-xl-4 col-md-4 col-12 right-column col d-none d-md-block'>
        <CreatePost />
        <Profiles />
        </Col>
      </Row>
    </>
    
  )
}

export default Home