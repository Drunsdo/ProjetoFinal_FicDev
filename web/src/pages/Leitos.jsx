import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import { Leito } from "../components/Leito";
import { Header } from "../components/Header";
import { createLeito, deleteLeito, getLeitos, updateLeito, getFiltroLeito } from "../services/leito-service";
import { getSalas } from "../services/sala-service";

export function Leitos() {
    const [leitos, setLeitos] = useState([]);
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [statusFiltro, setStatusFiltro] = useState("");

    useEffect(() => {
        findLeitos();
        findSalas();
        // eslint-disable-next-line
    }, []);

    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findLeitos() {
        try {
            const result = await getLeitos();
            setLeitos(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function handleFiltrar() {
        try {
            // Verifique se o campo de filtro não está vazio antes de chamar a API
            if (statusFiltro.trim() === "") {
                return; // Evite chamada à API se o filtro estiver vazio
            }

            // Verifique se o filtro é "Disponível" ou "Ocupado" e defina o valor correto
            let filtro = statusFiltro.toLowerCase();
            if (filtro === "disponível" || filtro === "disponivel" || filtro === "ocupado") {
                filtro = filtro === "disponível" || filtro === "disponivel" ? true : false;
            }

            const result = await getFiltroLeito({ statusLeito: filtro });
            setLeitos(result.data);
        } catch (error) {
            console.error(error);
        }
    }


    async function removeLeito(id) {
        try {
            await deleteLeito(id);
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }

    async function addLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' || data.statusLeito === 'Disponivel' || data.statusLeito === 'disponivel' ? true : data.statusLeito === 'Ocupado' || data.statusLeito === 'ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                salaIdLeito: data.salaIdLeito,
                statusLeito: status
            };

            await createLeito(leitoData);
            setIsCreated(false);
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }



    async function editLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' ? true : data.statusLeito === 'Ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                id: data.id,
                statusLeito: status,
                dataLeito: data.dataLeito,
                pacienteatualLeito: data.pacienteatualLeito,
                salaIdLeito: data.salaIdLeito
            }

            await updateLeito(leitoData);
            await findLeitos();
        } catch (error) {
            console.error("Erro ao editar leito:", error);
        }
    }

    return (
        <Container fluid>
            <NavbarComponent />
            <Header title="Leitos" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo Leito</Button>
                </Col>
            </Row>

            <Row className="w-50 m-auto mb-2">
                <Col md='8'>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="select"
                            name="statusLeito"
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                        >
                            <option value="">Filtrar por tipo</option>
                            <option value="Disponível">Disponível</option>
                            <option value="Ocupado">Ocupado</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col md='2'>
                    <Button onClick={handleFiltrar}>Filtrar</Button>
                </Col>
            </Row>

            <Col className="w-50 m-auto">
                {leitos && leitos.length > 0
                    ? leitos.map((leito, index) => (
                        <Leito
                            key={index}
                            leito={leito}
                            removeLeito={async () => await removeLeito(leito.id)}
                            editLeito={editLeito}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum leito cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo leito</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addLeito)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group controlId="formIdSala">
                            <Form.Label>Número da sala</Form.Label>
                            <Form.Select
                                name="salaIdLeito"
                                {...register('salaIdLeito')}
                            >
                                <option disabled>Clique para selecionar</option>
                                {salas && salas.length > 0
                                    ? salas
                                        .filter((sala) => sala.tipo === "Leito")
                                        .sort((a, b) => a.id - b.id)
                                        .map((sala) => (
                                            <option key={sala.id} value={sala.id}>
                                                {sala.id}
                                            </option>
                                        ))
                                    : <p className="text-center">Não existe nenhuma sala do tipo "Leito" cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Status do Leito</Form.Label>
                            <Form.Select
                                name="statusLeito"
                                {...register('statusLeito')}
                            >
                                <option disabled>Clique para selecionar</option>
                                <option value='Disponível'>Disponível</option>
                                <option value='Ocupado'>Ocupado</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}
