import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Menu() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(auth.name)


     function logout(){
        setAuth(null);
        navigate('/')
    }

  return (
    <nav>
		{auth ? (
                    <>
                        {['md'].map((expand) => (
                        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
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
                                    
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action4">
                                        Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/">
                                        <button onClick={logout} className="logout-Btn m-4">Log out</button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                    <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
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