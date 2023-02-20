import React from 'react';
// import '../../../App.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';
import Profiles from '../profile/Profiles';
import CreatePost from '../posts/CreatePost';


function Home() {
  return (
    <>
      <Row>
        <Col className='Post-container '>
          <Posts />
        </Col>
        <Col className='col-xl-4 col-md-4 col-12  right-column'>
        <CreatePost />
        <Profiles />
        </Col>
      </Row>
    </>
    
  )
}

export default Home