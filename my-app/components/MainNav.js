import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'

export default function MainNav() {
    return (
        <>
            <Navbar bg="light" expand="lg" className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Krinskumar Vaghasia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior><Nav.Link>Movies</Nav.Link></Link>
                        <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            <br/>
        </>
  );
}