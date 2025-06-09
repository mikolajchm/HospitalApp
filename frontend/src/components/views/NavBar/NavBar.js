import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { getUser } from '../../../redux/userRedux';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const user = useSelector(getUser);

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          HospitallApp
        </Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/home" className={styles.navLink}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/ad/add/ad" className={styles.navLink}>
                Add patient
              </Nav.Link>
              <Nav.Link as={Link} to="/ad/add/ad" className={styles.navLink}>
                Add attribution
              </Nav.Link>
              <Nav.Link as={Link} to="/logout" className={styles.navLink}>
                LogOut
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className={styles.navLink}>
                LogIn
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className={styles.navLink}>
                Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
