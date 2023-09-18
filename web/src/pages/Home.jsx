import { Container, Row, Col, Card} from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";

export function Home() {

    return (
        <Container fluid style={{ backgroundImage: 'url("/hospital-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <NavbarComponent />
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <Header title="Bem-vindo ao Software de Gestão de Salas e Leitos do Hospital" />
                <Row className="mt-4">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Gerenciamento Eficiente</Card.Title>
                                <Card.Text>
                                    Melhore a eficiência do hospital com nossa solução de gerenciamento de salas e leitos.
                                </Card.Text>
                                 
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Monitoramento em Tempo Real</Card.Title>
                                <Card.Text>
                                    Acompanhe o status das salas e leitos em tempo real para uma tomada de decisão rápida.
                                </Card.Text>
                                 
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Dashboard Detalhados</Card.Title>
                                <Card.Text>
                                    Oferecemos um dashboard detalhado, afim de apresentar algumas informções sobre os leitos no hospital.
                                </Card.Text>
                                 
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
