import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";
import '../styles/home.css';


export function Home() {

    return (
        <Container fluid className="home-container">

            <NavbarComponent />
            <div className="home-card">
                <Header title="Bem-vindo ao Software de Gestão de Salas e Leitos do Hospital" className="home-header" />
                <p className="home-subtitle text-center">Abaixo, você encontrará informações de serviços que o software entrega:</p>

                <Row className="mt-4">
                    <Col md={6}>
                        <Card className="home-card">
                            <Card.Body>
                                <Card.Title className="home-card-title">Gerenciamento Eficiente</Card.Title>
                                <Card.Text className="home-card-text">
                                    Melhore a eficiência do hospital com nossa solução de gerenciamento de salas e leitos.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="home-card">
                            <Card.Body>
                                <Card.Title className="home-card-title">Monitoramento em Tempo Real</Card.Title>
                                <Card.Text className="home-card-text">
                                    Acompanhe o status das salas e leitos em tempo real para uma tomada de decisão rápida.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="home-card">
                            <Card.Body>
                                <Card.Title className="home-card-title">Reservas de Salas/Leitos Simplificadas</Card.Title>
                                <Card.Text className="home-card-text">
                                    Realize reservas de salas e leitos de forma prática e ágil, assegurando uma gestão eficiente de recursos e garantindo que as necessidades dos pacientes sejam atendidas com precisão.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="home-card">
                            <Card.Body>
                                <Card.Title className="home-card-title">Dashboard Detalhados</Card.Title>
                                <Card.Text className="home-card-text">
                                    Oferecemos um dashboard detalhado, afim de apresentar algumas informações sobre os leitos e as salas do hospital.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

        </Container>
    );
}
