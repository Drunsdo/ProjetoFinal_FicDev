import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "../styles/leitos.css";
import Table from 'react-bootstrap/Table';
import "../styles/leitos.css";




export function Leito(props) {
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isReserva, setIsReserva] = useState(false);
    const [isDesocupa, setIsDesocupa] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
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

    async function removeLeito(data) {
        await props.removeLeito({ ...data, id: props.leito.id });
        setIsDeleted(false);
    }


    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    const editTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Editar
        </Tooltip>
    );

    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Deletar
        </Tooltip>
    );

    const reservaTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reservar Leito
        </Tooltip>
    );

    const desocupaTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Desocupar Leito
        </Tooltip>
    );



    return (
        <>
            <Table striped bordered hover size="sm" >
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "11%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th className="leitoNumero">Número</th>
                        <th className="leitoSala">Sala</th>
                        <th className="leitoStatus">Status</th>
                        <th className="leitoPaciente">Paciente</th>
                        <th className="leitoData">Data de Entrada</th>
                        <th className="leitoReserva">Reserva</th>
                        <th className="leitoEditar">Edição</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="leitoNumero">{props.leito.id}</td>
                        <td className="leitoSala">{props.leito.salaId}</td>
                        <td className="leitoStatus">{props.leito.status ? "Disponível" : "Ocupado"}</td>
                        {props.leito.status === false && (
                            <td className="leitoPaciente">{props.leito.pacienteatual}</td>

                        )}
                        {props.leito.status === true && (
                            <td className="leitoPaciente">Nenhum Paciente</td>
                        )}
                        {props.leito.status === false && (
                            <td className="leitoData">{new Date(props.leito.data).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>

                        )}
                        {props.leito.status === true && (
                            <td className="leitoData">Nenhuma Data</td>
                        )}
                        <td className="leitoReserva text-center">
                            {props.leito.status === true && (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={reservaTooltip}
                                >
                                    <Button variant="link" onClick={() => setIsReserva(true)}>
                                        <img src="reserva.png"
                                            width="30"
                                            height="30"
                                            alt="reserva" />
                                    </Button>
                                </OverlayTrigger>
                            )}
                            {props.leito.status === false && (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={desocupaTooltip}
                                >
                                    < Button
                                        variant="link"
                                        className="ms-0"

                                        onClick={() => setIsDesocupa(true)}
                                    >
                                        <img src="desoupa.png"
                                            width="25"
                                            height="25"
                                            alt="Desocupa" />
                                    </Button>
                                </OverlayTrigger>
                            )}
                        </td>
                        <td className="leitoEditar text-end">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={editTooltip}
                            >
                                <Button variant="link" onClick={() => setIsUpdated(true)}>
                                    <img
                                        src="/editar.png"
                                        width="30"
                                        height="30"
                                        alt="Editar"
                                    />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={deleteTooltip}
                            >
                                <Button
                                    variant="link"
                                    className="ms-0"
                                    onClick={() => setIsDeleted(true)}
                                >
                                    <img
                                        src="/delete.png"
                                        width="30"
                                        height="30"
                                        alt="Deletar"
                                    />
                                </Button>
                            </OverlayTrigger>

                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
                <Modal.Header>
                    <Modal.Title>Deseja deletar o leito {props.leito.id}?</Modal.Title>
                </Modal.Header>


                <Modal.Footer>
                    <Button variant="danger" onClick={() => removeLeito()}>Deletar</Button>
                    <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
                </Modal.Footer>

            </Modal>
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
