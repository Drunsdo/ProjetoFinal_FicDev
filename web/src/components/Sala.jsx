import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import "../styles/salas.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { Input } from "./Input";

export function Sala(props) {
    const { handleSubmit, register, formState: { errors, isSubmitted } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);


    async function editSala(data) {
        await props.editSala({ ...data, id: props.sala.id });
        setIsUpdated(false);
    }

    async function removeSala(data) {
        await props.removeSala({ ...data, id: props.sala.id });
        setIsDeleted(false);
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

            <Table striped bordered hover size="sm">
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "4%" }} />

                </colgroup>
                <thead>
                    <tr>
                        <th className="salaNumero">Número</th>
                        <th className="salaTipo">Tipo da Sala</th>
                        <th className="salaQuantidade">Quantidade de leitos</th>
                        <th className="salaEditar">Edição</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td className="salaNumero">{props.sala.id}</td>
                            <td className="salaTipo">{props.sala.tipo}</td>
                            <td className="salaQuantidade">{props.sala.quantidadeleitos}</td>
                            <td className="salaEditar text-end"> {/* Adicione a classe text-end aqui */}
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
                </tbody>
            </Table>


            <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
                <Modal.Header>
                    <Modal.Title>Deseja deletar a sala {props.sala.id}?</Modal.Title>
                </Modal.Header>


                <Modal.Footer>
                    <Button variant="danger" onClick={() => removeSala()}>Deletar</Button>
                    <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
                </Modal.Footer>

            </Modal>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar sala: {props.sala.tipo}</Modal.Title>
                </Modal.Header>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(editSala)} validated={isSubmitted}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Tipo da Sala</Form.Label>
                            <Form.Select
                                name="tipoSala"
                                {...register('tipoSala')}
                            >
                                {props.sala.tipo === 'Sala de Cirurgia' && (
                                    <>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'UTI' && (
                                    <>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Quarto de Pacientes' && (
                                    <>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Sala de Parto' && (
                                    <>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Laboratório' && (
                                    <>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Sala de Emergência' && (
                                    <>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Sala de Espera' && (
                                    <>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Sala de Consultas' && (
                                    <>
                                        <option value='Sala de Consultas'>Sala de Consultas Médicas</option>
                                        <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                        <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                        <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                        <option value='Sala de Parto'>Sala de Parto</option>
                                        <option value='Laboratório'>Laboratório</option>
                                        <option value='Sala de Emergência'>Sala de Emergência</option>
                                        <option value='Sala de Espera'>Sala de Espera</option>
                                    </>
                                )}


                            </Form.Select>
                        </Form.Group>
                        <div>
                            <label>Quantidade de Leitos</label>
                            <Input
                                className="mb-3"
                                type='integer'
                                defaultValue={props.sala.quantidadeleitos}
                                placeholder='Insira a quantidade de leitos da sala'
                                required={true}
                                name='quantidadeleitosSala'
                                error={errors.quantidadeleitosSala}
                                validations={register('quantidadeleitosSala', {
                                    required: {
                                        value: true,
                                        message: 'quantidade de leitos é obrigatório.'
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
            </Modal>
        </>
    );
}
