import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Reserva(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editReserva(data) {
        await props.editReserva({ ...data, id: props.reserva.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Sala: </strong>{props.reserva.salaId}</Card.Title>
                <Card.Text><strong>Responsável: </strong>{props.reserva.responsavel}</Card.Text>
                <Card.Text><strong>Data: </strong>{props.reserva.data}</Card.Text>
                <Card.Text><strong>Hora inicio: </strong>{props.reserva.horainicio}</Card.Text>
                <Card.Text><strong>Horam fim: </strong>{props.reserva.horafim}</Card.Text>

                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeReserva}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar reserva: {props.reserva.id}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editReserva)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='number'
                            defaultValue={props.reserva.salaId}
                            label='Id da sala'
                            placeholder='Insira o id da sala que pertence'
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
                            defaultValue={props.reserva.responsavel}
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
                            defaultValue={props.reserva.data}
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
                            defaultValue={props.reserva.horainicio}
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
                            defaultValue={props.reserva.horafim}
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
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}