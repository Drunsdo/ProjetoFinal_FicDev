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
                <Card.Text><strong>Id: </strong>{props.sala.id}</Card.Text>
                <Card.Text><strong>Quantidade de leitos: </strong>{props.sala.quantidadeleitos}</Card.Text>
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
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.sala.tipo}
                            label='Tipo da Sala'
                            placeholder='Insira o tipo da sala'
                            required={true}
                            name='tipoSala'
                            error={errors.tipoSala}
                            validations={register('tipoSala', {
                                required: {
                                    value: true,
                                    message: 'Tipo da sala é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='integer'
                            defaultValue={props.sala.quantidadeleitos}
                            label='Quantidade de leitos'
                            placeholder='Insira a quantidade de leitos'
                            required={true}
                            name='quantidadeleitosSala'
                            error={errors.quantidadeleitosSala}
                            validations={register('quantidadeleitosSala', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de leitos é obrigatório.'
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
