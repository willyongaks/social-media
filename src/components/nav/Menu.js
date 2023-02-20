import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../App.css';

function Menu() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();


     function logout(){
        setAuth(null);
        navigate('/')
    }

  return (
    <nav>
		{auth ? (
                    <>
                        {['md'].map((expand) => (
                        <Navbar key={expand}  variant="dark" expand={expand} className="mb-3 nav-bar">
                            <Container fluid>
                                <Navbar.Brand to="/">Soshols</Navbar.Brand>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                                <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                                >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                <Nav className="justify-content-center flex-grow-1 pe-3">
                                    <Link to="/home" className="nav-link">Home</Link>
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    <Link to="/posts" className="nav-link">Posts</Link>
                                    </Nav>
                                    <Nav className="d-flex">
                                    <Button variant="outline-success"
                                        onClick={logout}
                                        className="logout-Btn"
                                        >Log out</Button>
                                    </Nav>
                                </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
            ))}
                    
                    </>
                ): (
                    <Link to="/" />
            )} 

    </nav>
  )
}

export default Menu