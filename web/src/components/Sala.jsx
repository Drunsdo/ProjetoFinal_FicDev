import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Sala(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editSala(data) {
        await props.editSala({ ...data, id: props.sala.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
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
                        onClick={props.removeSala}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar sala: {props.sala.tipo}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editSala)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Tipo da Sala</Form.Label>
                            <Form.Select
                                name="tipoSala"
                                {...register('tipoSala')}
                            >
                                <option disabled>Clique para selecionar</option>
                                <option value='Leito'>Leito</option>
                                <option value='Cirúrgica'>Cirúrgica</option>
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
