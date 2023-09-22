import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service"


import { Input } from "./Input";

export function Reserva(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [salas, setSalas] = useState([]);

    async function editReserva(data) {
        await props.editReserva({ ...data, id: props.reserva.id });
        setIsUpdated(false);
    }

    useEffect(() => {
        findSalas();
        // eslint-disable-next-line
    }, []);

    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
        }
    }


    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Sala: </strong>{props.reserva.salaId}</Card.Title>
                <Card.Text><strong>Responsável: </strong>{props.reserva.responsavel}</Card.Text>
                <Card.Text><strong>Data: </strong>{formatDate(props.reserva.data)}</Card.Text>
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
                    <Form.Group controlId="formIdSala">
                            <Form.Label>Número da sala</Form.Label>
                            <Form.Select
                                name="salaIdLeito"
                                {...register('salaIdLeito')}
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
                                defaultValue={props.reserva.responsavel}
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
                                defaultValue={props.reserva.data}
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
                                defaultValue={props.reserva.horainicio}
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
                                defaultValue={props.reserva.horafim}
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
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}