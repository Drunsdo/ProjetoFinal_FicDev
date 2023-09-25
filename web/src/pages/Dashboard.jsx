import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavbarComponent } from "../components/Navbar";
import { getQuantidadeSalas, getQuantidadeLeitoSalas, getQuantidadeCirurgicaSalas } from "../services/sala-service";
import { getQuantidadeLeitos, getQuantidadeDisponivelLeitos, getQuantidadeOcupadoLeitos } from "../services/leito-service";
import { getQuantidadeReservas } from "../services/reserva-service";
import '../styles/dash.css';
import Chart from 'react-apexcharts'



export function Dashboard() {
    const [quantidadeSalas, setQuantidadeSalas] = useState([]);
    const [quantidadeLeitos, setQuantidadeLeitos] = useState([]);
    const [quantidadeReservas, setQuantidadeReservas] = useState([]);
    //Gráficos
    const [dadosLeitoSalas, setDadosLeitoSalas] = useState([]);
    const [dadosCirurgicaSalas, setDadosCirurgicaSalas] = useState([]);
    const [dadosDisponivelLeitos, setDadosDisponivelLeitos] = useState([]);
    const [dadosOcupadoLeitos, setDadosOcupadoLeitos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultSalas = await getQuantidadeSalas();
                const resultLeitos = await getQuantidadeLeitos();
                const resultReservas = await getQuantidadeReservas();
                const resultLeitoSalas = await getQuantidadeLeitoSalas();
                const resultCirurgicaSalas = await getQuantidadeCirurgicaSalas();
                const resultDisponivelLeitos = await getQuantidadeDisponivelLeitos();
                const resultOcupadoLeitos = await getQuantidadeOcupadoLeitos();


                setQuantidadeSalas(resultSalas.data);
                setQuantidadeLeitos(resultLeitos.data);
                setQuantidadeReservas(resultReservas.data);
                setDadosLeitoSalas(resultLeitoSalas.data);
                setDadosCirurgicaSalas(resultCirurgicaSalas.data);
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
                                type='donut'
                                width='100%' /* Use 100% de largura para tornar o gráfico responsivo */
                                height={550}
                                series={[dadosLeitoSalas, dadosCirurgicaSalas]}
                                options={{
                                    labels: ['Leito', 'Cirúrgica'],
                                    title:{
                                        text: "Gráfico de Tipos de Salas"
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
                                height={550}
                                series={[dadosDisponivelLeitos, dadosOcupadoLeitos]}
                                options={{
                                    labels: ['Disponível', 'Ocupado'],
                                    title:{
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
