import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { Input } from "./Input";

export function Reserva(props) {
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [salas, setSalas] = useState([]);

    async function editReserva(data) {
        await props.editReserva({ ...data, id: props.reserva.id });
        setIsUpdated(false);
    }

    async function removeReserva(data) {
        await props.removeReserva({ ...data, id: props.reserva.id });
        setIsDeleted(false);
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


    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Sala: </strong>{props.reserva.salaId}</Card.Title>
                <Card.Text><strong>Responsável: </strong>{props.reserva.responsavel}</Card.Text>
                <Card.Text><strong>Número da reserva: </strong>{props.reserva.id}</Card.Text>

                <Card.Text><strong>Inicio: </strong>{new Date(props.reserva.datainicio).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Card.Text>
                <Card.Text><strong>Fim: </strong>{new Date(props.reserva.datafim).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Card.Text>


                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={() => setIsDeleted(true)}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
                <Modal.Header>
                    <Modal.Title>Deseja deletar a reserva {props.reserva.id}?</Modal.Title>
                </Modal.Header>


                <Modal.Footer>
                    <Button variant="danger" onClick={() => removeReserva()}>Deletar</Button>
                    <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
                </Modal.Footer>

            </Modal>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar Reserva: {props.reserva.id}</Modal.Title>
                </Modal.Header>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(editReserva)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group controlId="formIdSala">
                            <Form.Label>Número da sala</Form.Label>
                            <Form.Select
                                name="salaIdReserva"
                                {...register('salaIdReserva')}
                            >
                                <option disabled>Clique para selecionar</option>
                                {salas && salas.length > 0
                                    ? [
                                        // Coloque a sala correspondente a salaIdLeito no topo da lista
                                        ...salas.filter((sala) => sala.id === props.reserva.salaId).map((sala) => (
                                            <option key={sala.id} value={sala.id}>
                                                {sala.id}
                                            </option>
                                        )),
                                        // Em seguida, adicione as outras salas que atendem aos critérios
                                        ...salas
                                            .filter((sala) => sala.tipo === "Cirúrgica" && sala.id !== props.reserva.salaId)
                                            .sort((a, b) => a.id - b.id)
                                            .map((sala) => (
                                                <option key={sala.id} value={sala.id}>
                                                    {sala.id}
                                                </option>
                                            ))
                                    ]
                                    : <p className="text-center">Não existe nenhuma sala do tipo "Leito" cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>

                        <div>
                            <label>Responsável da Reserva</label>
                            <Input
                                className="mb-3"
                                type='text'
                                //defaultValue={props.reserva.responsavel}
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
                            <label>Data de Início da Reserva</label>
                            <DatePicker
                                selected={watch('datainicioReserva') || null}
                                onChange={(date) => setValue('datainicioReserva', date, { shouldValidate: true })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="mb-3 form-control"
                                name="datainicioReserva"
                                required={true}
                            />
                        </div>

                        <div>
                            <label>Data de Fim da Reserva</label>
                            <DatePicker
                                selected={watch('datafimReserva') || null}
                                onChange={(date) => setValue('datafimReserva', date, { shouldValidate: true })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="mb-3 form-control"
                                name="datafimReserva"
                                required={true}
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