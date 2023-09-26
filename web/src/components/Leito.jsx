import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Leito(props) {
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isReserva, setIsReserva] = useState(false);
    const [isDesocupa, setIsDesocupa] = useState(false);
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
        await props.reservarLeito({ ...data, id: props.leito.id, statusLeito: "Ocupado" });
        setIsReserva(false);
    }

    async function desocupaLeito(data) {
        if (props.desocupaLeito) {
            await props.desocupaLeito({ ...data, id: props.leito.id, statusLeito: "Disponível" });
        } else {
            console.error("props.desocupaLeito não está definido.");
        }
        setIsDesocupa(false);
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
                    <Card.Text><strong>Paciente atual: </strong>{props.leito.pacienteatual}</Card.Text>
                )}
                {(props.leito.pacienteatual !== null && (props.leito.status === true && props.leito.pacienteatual === null)) && (
                    <Card.Text><strong>Data: </strong>{new Date(props.leito.data).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Card.Text>
                )}

                <Row xs="auto" className="d-flex justify-content-end">
                    {props.leito.status === true && (
                        <Button variant="primary" onClick={() => setIsReserva(true)}>
                            Reservar
                        </Button>
                    )}
                    {props.leito.status === false && (
                        < Button
                            variant="success"
                            className="ms-3"

                            onClick={() => setIsDesocupa(true)}
                        >
                            Desocupar
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
            </Card >
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar leito: {props.leito.id}</Modal.Title>
                </Modal.Header>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(editLeito)} validated={!!errors}>
                    <Modal.Body>
                        <div>
                            <label>Nome do paciente</label>
                            <Input
                                className="mb-3"
                                type="text"
                                defaultValue={props.leito.pacienteatual}
                                name="pacienteatualLeito"
                                validations={register("pacienteatualLeito")}
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
                        <br />
                        <div>
                            <label>Data</label>
                            <br />
                            <DatePicker
                                selected={watch('dataLeito') || null}
                                onChange={(date) => setValue('dataLeito', date, { shouldValidate: true })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="mb-3 form-control"
                                name="dataLeito"
                                required={false}
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
                                    ? [
                                        // Coloque a sala correspondente a salaIdLeito no topo da lista
                                        ...salas.filter((sala) => sala.id === props.leito.salaId).map((sala) => (
                                            <option key={sala.id} value={sala.id}>
                                                {sala.id}
                                            </option>
                                        )),
                                        // Em seguida, adicione as outras salas que atendem aos critérios
                                        ...salas
                                            .filter((sala) => sala.tipo === "Leito" && sala.id !== props.leito.salaId)
                                            .sort((a, b) => a.id - b.id)
                                            .map((sala) => (
                                                <option key={sala.id} value={sala.id}>
                                                    {sala.id}
                                                </option>
                                            ))
                                    ]
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
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(reservarLeito)} validated={!!errors}>
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

                        <div>
                            <label>Data</label>
                            <br />
                            <DatePicker
                                selected={watch('dataLeito') || new Date()}
                                onChange={(date) => setValue('dataLeito', date, { shouldValidate: true })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="mb-3 form-control"
                                name="dataLeito"
                                required={true}
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

            <Modal show={isDesocupa} onHide={() => setIsDesocupa(false)}>
                <Modal.Header>
                    <Modal.Title>Desocupar Leito: {props.leito.id}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={desocupaLeito}>
                        Desocupar
                    </Button>
                    <Button variant="secondary" onClick={() => setIsDesocupa(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
