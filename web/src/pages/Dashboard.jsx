import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";
import { getQuantidadeSalas, getQuantidadeTipoSalas } from "../services/sala-service";
import { getQuantidadeLeitos, getQuantidadeStatusLeitos } from "../services/leito-service";
import { getQuantidadeReservas } from "../services/reserva-service";
import '../styles/dash.css';


export function Dashboard() {
    const [quantidadeSalas, setQuantidadeSalas] = useState([]);
    const [quantidadeLeitos, setQuantidadeLeitos] = useState([]);
    const [quantidadeReservas, setQuantidadeReservas] = useState([]);

    const [dadosTipoSalas, setDadosTipoSalas] = useState([]);
    const [dadosStatusLeitos, setDadosStatusLeitos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultSalas = await getQuantidadeSalas();
                const resultLeitos = await getQuantidadeLeitos();
                const resultReservas = await getQuantidadeReservas();
                const resultTipoSalas = await getQuantidadeTipoSalas();
                const resultStatusLeitos = await getQuantidadeStatusLeitos();

                setQuantidadeSalas(resultSalas.data);
                setQuantidadeLeitos(resultLeitos.data);
                setQuantidadeReservas(resultReservas.data);
                setDadosTipoSalas(resultTipoSalas.data);
                setDadosStatusLeitos(resultStatusLeitos.data);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <Container fluid className="dash-container">
            <NavbarComponent />

            <Header as="h2">Seu Dashboard</Header>

            <Row>
                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total de Salas</Card.Title>
                            <Card.Text>{quantidadeSalas}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total de Reservas</Card.Title>
                            <Card.Text>{quantidadeReservas}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total de Leitos</Card.Title>
                            <Card.Text>{quantidadeLeitos}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br></br>
            
        </Container>
    );
}
