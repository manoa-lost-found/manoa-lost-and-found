'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: '#024731', // UH Mānoa green
        borderBottom: '4px solid #6BA539', // UH accent
      }}
      variant="dark"
    >
      <Container>

        {/* LOGO + BRAND */}
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <Image
            src="/uh-logo.png"
            alt="UH Logo"
            width={38}
            height={38}
            style={{ marginRight: '10px' }}
          />
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Manoa Lost & Found
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link as={Link} href="/list" style={{ color: 'white' }}>
              Lost/Found Feed
            </Nav.Link>

            <Nav.Link as={Link} href="/add/lost" style={{ color: 'white' }}>
              Report Lost Item
            </Nav.Link>

            <Nav.Link as={Link} href="/add/found" style={{ color: 'white' }}>
              Report Found Item
            </Nav.Link>

            {/* LOGIN MENU */}
            <NavDropdown
              title="Login"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              <NavDropdown.Item as={Link} href="/auth/signin">
                Sign in
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/auth/signup">
                Sign up
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .nav-link:hover {
          color: #6BA539 !important; /* UH Light Green */
        }
      `}</style>
    </Navbar>
  );
}
