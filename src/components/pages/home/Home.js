import React from 'react';
import '../../../App.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../posts/Posts';


function Home() {
  return (
      <Row>
        <Col className='Post-container col-xl-8 col-md-9 col-12'>
          <Posts />
        </Col>
        <Col className='col-xl-2 col-md-3 col-12 '>1 of 3</Col>
      </Row>
    
  )
}

export default Home