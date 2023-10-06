import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getSalas } from "../services/sala-service";
import DatePicker from "react-datepicker";
import "../styles/reservas.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import "react-datepicker/dist/react-datepicker.css";


import { Input } from "./Input";

export function Reserva(props) {
    const { handleSubmit, register, formState: { errors, isSubmitted }, setValue, watch } = useForm();
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


    return (
        <>


            <tr>
                <td className="reservaNumero">{props.reserva.id}</td>
                <td className="reservaSala">
                    {props.reserva.salaId} - {salas.find((sala) => sala.id === props.reserva.salaId)?.tipo}
                </td>
                <td className="reservaResponsavel">{props.reserva.responsavel}</td>
                <td className="reservaInicio">{new Date(props.reserva.datainicio).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="reservaFim">{new Date(props.reserva.datafim).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>

                <td className="reservaAcao text-end">
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={editTooltip}
                    >
                        <Button variant="link" onClick={() => setIsUpdated(true)}>
                            <img
                                src="/editar2.png"
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
                            className="ms-1"
                            onClick={() => setIsDeleted(true)}
                        >
                            <img
                                src="/deletar2.png"
                                width="30"
                                height="30"
                                alt="Deletar"
                            />
                        </Button>
                    </OverlayTrigger>
                </td>
            </tr>


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
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(editReserva)} validated={isSubmitted}>
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
                                            .filter((sala) => sala.tipo !== "UTI" && sala.tipo !== "Quarto de Pacientes" && sala.id !== props.reserva.salaId)
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
                            <br></br>
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
                            <br></br>
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