import { Container, Nav, Navbar } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import '../styles/navbar.css'; // Importe seu arquivo CSS


export function NavbarComponent(props) {
    const perfilTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Perfil
        </Tooltip>
    );

    const logoutTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Sair
        </Tooltip>
    );
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand href="/dashboard"><img
                    alt="Cama"
                    src="cama-de-hospital.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}GSL</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/salas">Salas</Nav.Link>
                        <Nav.Link href="/reservas">Reservas de Sala</Nav.Link>
                        <Nav.Link href="/leitos">Leitos</Nav.Link>

                    </Nav>
                    <Nav>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={perfilTooltip}
                        >
                            <Navbar.Brand href="/perfil">
                                <img
                                    src="/person.svg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Perfil"
                                />
                            </Navbar.Brand>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={logoutTooltip}
                        >
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
                        </OverlayTrigger>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}