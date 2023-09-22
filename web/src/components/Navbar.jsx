import { Container, Nav, Navbar } from 'react-bootstrap';

import '../styles/navbar.css'; // Importe seu arquivo CSS


export function NavbarComponent(props) {
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/salas">Salas</Nav.Link>
                        <Nav.Link href="/reservas">Reservas de Sala</Nav.Link>
                        <Nav.Link href="/leitos">Leitos</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <Nav>
                        <Navbar.Brand href="/perfil">
                            <img
                                src="/person.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Perfil"
                            />
                        </Navbar.Brand>
                        <Navbar.Brand
                            href="/"
                            onClick={() => {
                                sessionStorage.removeItem('token');
                            }}
                        >
                            <img
                                src="/logout.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Sair"
                            />
                        </Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}