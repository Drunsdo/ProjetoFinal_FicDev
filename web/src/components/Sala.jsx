import { useState } from "react";
import { Button, Card, Form, Modal, Row} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Sala(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
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

    return (
        <>
            <Card className="mb-3 p-3 bg-light ">
                <Card.Title><strong>Tipo: </strong>{props.sala.tipo}</Card.Title>
                <Card.Text><strong>Número da sala: </strong>{props.sala.id}</Card.Text>
                {props.sala.tipo === "Leito" && (
                    <>
                        <Card.Text><strong>Quantidade de leitos: </strong>{props.sala.quantidadeleitos}</Card.Text>
                    </>
                )}
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
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(editSala)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Tipo da Sala</Form.Label>
                            <Form.Select
                                name="tipoSala"
                                {...register('tipoSala')}
                            >
                                {props.sala.tipo === 'Leito' && (
                                    <>
                                        <option value='Leito'>Leito</option>
                                        <option value='Cirúrgica'>Cirúrgica</option>
                                    </>
                                )}
                                {props.sala.tipo === 'Cirúrgica' && (
                                    <>
                                        <option value='Cirúrgica'>Cirúrgica</option>
                                        <option value='Leito'>Leito</option>
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
