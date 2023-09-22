import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import Select from 'react-select';
import "../styles/reservas.css"



import { Reserva } from "../components/Reserva";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import { getSalas } from "../services/sala-service";

import { createReserva, deleteReserva, getReservas, updateReserva, getFiltroReservas } from "../services/reserva-service";

export function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [salaIdFiltro, setSalaIdFiltro] = useState("");

    useEffect(() => {
        findReservas();
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

    async function findReservas() {
        try {
            const result = await getReservas();
            setReservas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function handleFiltrar() {
        try {
            let filtro = salaIdFiltro;
            if (salaIdFiltro === "Todos") {
                // Se a opção for "todos", não aplique filtro e retorne todas as reservas
                await findReservas();
            } else {
                // Caso contrário, aplique o filtro de acordo com o ID da sala selecionada
                const result = await getFiltroReservas({ salaIdReserva: filtro });
                setReservas(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function removeReserva(id) {
        try {
            await deleteReserva(id);
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addReserva(data) {
        try {
            await createReserva(data);
            setIsCreated(false);
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editReserva(data) {
        try {
            await updateReserva({
                id: data.id,
                responsavelReserva: data.responsavelReserva,
                horainicioReserva: data.horainicioReserva,
                horafimReserva: data.horafimReserva,
                dataReserva: data.dataReserva,
                salaIdReserva: data.salaIdReserva
            });
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid className="reservas-container">
            <NavbarComponent />
            <Header title="Reservas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova Reserva</Button>
                </Col>
            </Row>

            <Row className="w-50 m-auto mb-2">
                <Col md='8'>
                    <Select
                        name="salaIdLeito"
                        options={[
                            { value: 'Todos', label: 'Todos' },
                            ...(salas && salas.length > 0
                                ? salas
                                    .filter((sala) => sala.tipo === "Cirúrgica")
                                    .sort((a, b) => a.id - b.id)
                                    .map((sala) => ({
                                        value: sala.id,
                                        label: sala.id.toString(),
                                    }))
                                : [{ value: '', label: 'Não existe nenhuma sala do tipo "Cirúrgica" cadastrada!' }]
                            )
                        ]}
                        value={{ value: salaIdFiltro, label: salaIdFiltro.toString() }}
                        onChange={(selectedOption) => setSalaIdFiltro(selectedOption.value)}
                        className="salas-select-filter"
                        isSearchable={false} // Para desativar a pesquisa
                        styles={{
                            indicatorSeparator: () => { }, // Para remover a linha vertical entre o seletor e a seta
                        }}
                    />
                </Col>

                <Col md='2'>
                    <Button onClick={handleFiltrar}>Filtrar</Button>
                </Col>
            </Row>

            <Col className="w-50 m-auto">
                {reservas && reservas.length > 0
                    ? reservas.map((reserva, index) => (
                        <Reserva
                            key={index}
                            reserva={reserva}
                            removeReserva={async () => await removeReserva(reserva.id)}
                            editReserva={editReserva}
                        />
                    ))
                    : <p className="text-center">Não existe nenhuma reserva cadastrada!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova reserva</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addReserva)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group controlId="formIdSala">
                            <Form.Label>Número da sala</Form.Label>
                            <Form.Select
                                name="salaIdReserva"
                                {...register('salaIdReserva')}
                            >
                                <option disabled>Clique para selecionar</option>
                                {salas && salas.length > 0
                                    ? salas
                                        .filter((sala) => sala.tipo === "Cirúrgica")
                                        .sort((a, b) => a.id - b.id)
                                        .map((sala) => (
                                            <option key={sala.id} value={sala.id}>
                                                {sala.id}
                                            </option>
                                        ))
                                    : <p className="text-center">Não existe nenhuma sala do tipo "Leito" cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>
                        <div>
                            <label>Responsável da Reserva</label>
                            <Input
                                className="mb-3"
                                type='text'

                                required={true}
                                name='responsavelReserva'
                                error={errors.responsavelReserva}
                                validations={register('responsavelReserva', {
                                    required: {
                                        value: true,
                                        message: 'Nome do responsavel é obrigatório.'
                                    }
                                })}
                            />
                        </div>

                        <div>
                            <label>Data da Reserva</label>
                            <Input
                                className="mb-3"
                                type='date'
                                required={true}
                                name='dataReserva'
                                error={errors.dataReserva}
                                validations={register('dataReserva', {
                                    required: {
                                        value: true,
                                        message: 'data da reserva é obrigatório.'
                                    }
                                })}
                            />
                        </div>

                        <div>
                            <label>Hora de Inicio</label>
                            <Input
                                className="mb-3"
                                type='time'
                                required={true}
                                name='horainicioReserva'
                                error={errors.horainicioReserva}
                                validations={register('horainicioReserva', {
                                    required: {
                                        value: true,
                                        message: 'Hora inicio da reserva é obrigatório.'
                                    }
                                })}
                            />
                        </div>

                        <div>
                            <label>Hora de Fim</label>
                            <Input
                                className="mb-3"
                                type='time'

                                required={true}
                                name='horafimReserva'
                                error={errors.horafimReserva}
                                validations={register('horafimReserva', {
                                    required: {
                                        value: true,
                                        message: 'Hora do fim da reserva é obrigatório.'
                                    }
                                })}
                            />
                        </div>

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