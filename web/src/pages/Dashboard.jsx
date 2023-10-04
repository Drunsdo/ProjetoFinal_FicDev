import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";
import {
    getQuantidadeSalas, getQuantidadeUTISalas, getQuantidadeQuartoSalas, getQuantidadeCirurgiaSalas, getQuantidadeConsultaSalas,
    getQuantidadeEmergenciaSalas, getQuantidadeEsperaSalas, getQuantidadeLaboratorioSalas, getQuantidadePartoSalas
} from "../services/sala-service";
import { getQuantidadeLeitos, getQuantidadeDisponivelLeitos, getQuantidadeOcupadoLeitos } from "../services/leito-service";
import { getQuantidadeReservas } from "../services/reserva-service";
import '../styles/dash.css';
import Chart from 'react-apexcharts'



export function Dashboard() {
    const [quantidadeSalas, setQuantidadeSalas] = useState([]);
    const [quantidadeLeitos, setQuantidadeLeitos] = useState([]);
    const [quantidadeReservas, setQuantidadeReservas] = useState([]);
    //Gráficos Bar
    const [dadosUTISalas, setDadosUTISalas] = useState([]);
    const [dadosQuartoSalas, setDadosQuartoSalas] = useState([]);
    const [dadosCirurgiaSalas, setDadosCirurgiaSalas] = useState([]);
    const [dadosConsultaSalas, setDadosConsultaSalas] = useState([]);
    const [dadosEmergenciaSalas, setDadosEmergenciaSalas] = useState([]);
    const [dadosEsperaSalas, setDadosEsperaSalas] = useState([]);
    const [dadosLaboratorioSalas, setDadosLaboratorioSalas] = useState([]);
    const [dadosPartoSalas, setDadosPartoSalas] = useState([]);
    //Gráficos Donut
    const [dadosDisponivelLeitos, setDadosDisponivelLeitos] = useState([]);
    const [dadosOcupadoLeitos, setDadosOcupadoLeitos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultSalas = await getQuantidadeSalas();
                const resultLeitos = await getQuantidadeLeitos();
                const resultReservas = await getQuantidadeReservas();
                const resultUTISalas = await getQuantidadeUTISalas();
                const resultQuartoSalas = await getQuantidadeQuartoSalas();
                const resultDisponivelLeitos = await getQuantidadeDisponivelLeitos();
                const resultOcupadoLeitos = await getQuantidadeOcupadoLeitos();
                const resultCirurgiaSalas = await getQuantidadeCirurgiaSalas();
                const resultConsultaSalas = await getQuantidadeConsultaSalas();
                const resultEmergenciaSalas = await getQuantidadeEmergenciaSalas();
                const resultEsperaSalas = await getQuantidadeEsperaSalas();
                const resultLaboratorioSalas = await getQuantidadeLaboratorioSalas();
                const resultPartoSalas = await getQuantidadePartoSalas();

                setQuantidadeSalas(resultSalas.data);
                setQuantidadeLeitos(resultLeitos.data);
                setQuantidadeReservas(resultReservas.data);

                setDadosUTISalas(resultUTISalas.data);
                setDadosQuartoSalas(resultQuartoSalas.data);
                setDadosCirurgiaSalas(resultCirurgiaSalas.data);
                setDadosConsultaSalas(resultConsultaSalas.data);
                setDadosEmergenciaSalas(resultEmergenciaSalas.data);
                setDadosEsperaSalas(resultEsperaSalas.data);
                setDadosLaboratorioSalas(resultLaboratorioSalas.data);
                setDadosPartoSalas(resultPartoSalas.data)

                setDadosDisponivelLeitos(resultDisponivelLeitos.data);
                setDadosOcupadoLeitos(resultOcupadoLeitos.data);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);




    return (
        <Container fluid className="dash-container">
            <NavbarComponent />
            <Header title="Dashboard de Estatísticas Hospitalares" />
            <Row>
                <Col lg={4} md={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>Total de Salas</Card.Title>
                            <Card.Text>{quantidadeSalas}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>Total de Reservas</Card.Title>
                            <Card.Text>{quantidadeReservas}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>Total de Leitos</Card.Title>
                            <Card.Text>{quantidadeLeitos}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col lg={6} md={12}> {/* Coluna de tamanho 6 para telas grandes (lg) e 12 para telas médias (md) */}
                    <Card className="custom-card">
                        <Card.Body>
                            <Chart
                                type='bar'
                                width='100%' /* Use 100% de largura para tornar o gráfico responsivo */
                                height={600}
                                series={[
                                    {
                                        name: "Quantidade: ",
                                        data: [dadosUTISalas, dadosQuartoSalas, dadosCirurgiaSalas, dadosConsultaSalas, dadosEmergenciaSalas, dadosEsperaSalas, dadosLaboratorioSalas, dadosPartoSalas]
                                    },
                                ]}
                                options={{
                                    labels: ['UTI', 'Quarto de Pacientes', 'Sala de Cirurgia', 'Sala de Consultas', 'Sala de Emergência', 'Sala de Espera', 'Laboratório', 'Sala de Parto'],
                                    title: {
                                        text: "Quantidade de Salas por Tipo"
                                    },
                                    xaxis: {
                                        title: {
                                            text: "Tipo da Sala",
                                            style: { fontSize: 15 }
                                        }
                                    },
                                    yaxis: {
                                        title: {
                                            text: "Quantidade",
                                            style: { fontSize: 15 }
                                        }
                                    }
                                }}
                            />

                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} md={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Chart
                                type='donut'
                                width='100%' /* Use 100% de largura para tornar o gráfico responsivo */
                                height={612}
                                series={[dadosDisponivelLeitos, dadosOcupadoLeitos]}
                                options={{
                                    labels: ['Disponível', 'Ocupado'],
                                    title: {
                                        text: "Gráfico de Leitos Diponíveis e Ocupados"
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
