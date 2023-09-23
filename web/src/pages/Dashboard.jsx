import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";
import '../styles/dash.css';

export function Dashboard() {
    return (
        <Container fluid className="dash-container">
            <NavbarComponent />

            <Header as="h2">Seu Dashboard</Header>

            <Row>
                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card 1</Card.Title>
                            <Card.Text>Conteúdo do Card 1.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card 2</Card.Title>
                            <Card.Text>Conteúdo do Card 2.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Card 3</Card.Title>
                            <Card.Text>Conteúdo do Card 3.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
