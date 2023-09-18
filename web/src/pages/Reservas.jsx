import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";

import { Reserva } from "../components/Reserva";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createReserva, deleteReserva, getReservas, updateReserva } from "../services/reserva-service";

export function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findReservas();
        // eslint-disable-next-line
    }, []);

    async function findReservas() {
        try {
            const result = await getReservas();
            setReservas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
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
                idReserva: data.idReserva,
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
        <Container fluid>
            <NavbarComponent />
            <Header title="Reservas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova Reserva</Button>
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
                        <Input
                            className="mb-3"
                            type='integer'
                            label='Id da sala'
                            placeholder='Insira o id da salaaa que pertence'
                            required={true}
                            name='salaIdReserva'
                            error={errors.salaIdReserva}
                            validations={register('salaIdReserva', {
                                required: {
                                    value: true,
                                    message: 'sala da reserva é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Responsável da reserva'
                            placeholder='Insira o nome do responsavel'
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
                        <Input
                            className="mb-3"
                            type='date'
                            label='Data'
                            placeholder='Insira a data da reserva'
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
                        <Input
                            className="mb-3"
                            type='time'
                            label='Hora inicio'
                            placeholder='Insira o horário de inicio'
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
                        <Input
                            className="mb-3"
                            type='time'
                            label='Hora fim'
                            placeholder='Insira o horário final'
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