import React from 'react';
import '../../../App.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';
import Profiles from '../profile/Profiles';
import CreatePost from '../posts/CreatePost';
import Menu from '../../nav/Menu';


function Home() {
  return (
    <>
    <Menu />
      <Row>
        <Col className='Post-container col-xl-8 col-md-8 col-12'>
          <Posts />
        </Col>
        <Col className='col-xl-4 col-md-3 col-12  right-column'>
        <CreatePost />
        <Profiles />
        </Col>
      </Row>
    </>
    
  )
}

export default Home