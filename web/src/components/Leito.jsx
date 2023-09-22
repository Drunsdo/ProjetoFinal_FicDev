import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service"

export function Leito(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isReserva, setIsReserva] = useState(false);
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        findSalas();
        // eslint-disable-next-line
    }, []);

    async function editLeito(data) {
        await props.editLeito({ ...data, id: props.leito.id });
        setIsUpdated(false);
    }

    async function reservarLeito(data) {
        await props.reservarLeito({ ...data, id: props.leito.id });
        setIsReserva(false);
    }



    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Status: </strong>{props.leito.status ? "Disponível" : "Ocupado"}</Card.Title>
                <Card.Text><strong>Número do leito: </strong>{props.leito.id}</Card.Text>
                <Card.Text><strong>Número da sala: </strong>{props.leito.salaId}</Card.Text>
                {props.leito.status === false && (
                    <>
                        <Card.Text><strong>Paciente atual: </strong>{props.leito.pacienteatual}</Card.Text>
                        <Card.Text><strong>Data: </strong>{formatDate(props.leito.data)}</Card.Text>
                    </>
                )}
                <Row xs="auto" className="d-flex justify-content-end">
                    {props.leito.status === true && (
                        <Button variant="primary" onClick={() => setIsReserva(true)}>
                            Reservar
                        </Button>
                    )}
                    <Button variant="secondary" className="ms-3" onClick={() => setIsUpdated(true)}>
                        Editar
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeLeito}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar leito: {props.leito.id}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editLeito)} validated={!!errors}>
                    <Modal.Body>
                        <div>
                            <label>Nome do paciente</label>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.leito.pacienteatual}
                                name="pacienteatualLeito"
                                {...register("pacienteatualLeito")}
                            />
                        </div>
                        <Form.Group>
                            <Form.Label>Status do Leito</Form.Label>
                            <Form.Select name="statusLeito" {...register("statusLeito")}>
                                <option disabled>Clique para selecionar</option>
                                <option value="Disponível">Disponível</option>
                                <option value="Ocupado">Ocupado</option>
                            </Form.Select>
                        </Form.Group>
                        <div>
                            <label>Data</label>
                            <Input
                                className="mb-3"
                                type="date"
                                defaultValue={props.leito.data}
                                name="dataLeito"
                                validations={register("dataLeito")}
                            />
                        </div>

                        <Form.Group controlId="formIdSala">
                            <Form.Label>Número da Sala</Form.Label>
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
                                    : <p className="text-center">Não existe nenhuma sala cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>
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

            <Modal show={isReserva} onHide={() => setIsReserva(false)}>
                <Modal.Header>
                    <Modal.Title>Reserva leito: {props.leito.id}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(reservarLeito)} validated={!!errors}>
                    <Modal.Body>
                        <div>
                            <label>Nome do paciente</label>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.leito.pacienteatual}
                                placeholder="Insira o nome do paciente"
                                required={true}
                                name="pacienteatualLeito"
                                error={errors.pacienteatualLeito}
                                validations={register("pacienteatualLeito", {
                                    required: {
                                        value: true,
                                        message: "Nome do cliente é obrigatório.",
                                    },
                                })}
                            />
                        </div>
                        <Form.Group>
                            <Form.Label>Status do Leito</Form.Label>
                            <Form.Select name="statusLeito" {...register("statusLeito")}>
                                <option disabled>Clique para selecionar</option>
                                <option value="Disponível">Disponível</option>
                                <option value="Ocupado">Ocupado</option>
                            </Form.Select>
                        </Form.Group>
                        <div>
                            <label>Data</label>
                            <Input
                                className="mb-3"
                                type="date"
                                defaultValue={props.leito.data}
                                name="dataLeito"
                                error={errors.dataLeito}
                                validations={register("dataLeito")}
                            />
                        </div>

                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Reservar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsReserva(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
