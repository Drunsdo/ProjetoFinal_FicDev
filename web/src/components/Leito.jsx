import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Leito(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editLeito(data) {
        await props.editLeito({ ...data, id: props.leito.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Status: </strong>{props.leito.status? "Disponível": "Ocupado"}</Card.Title>
                <Card.Text><strong>Paciente atual: </strong>{props.leito.pacienteatual}</Card.Text>
                <Card.Text><strong>Data: </strong>{props.leito.data}</Card.Text>
                <Card.Text><strong>Id da sala pertencente: </strong>{props.leito.salaId}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
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
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.leito.pacienteatual}
                            label='Nome do paciente'
                            placeholder='Insira o nome do paciente'
                            required={true}
                            name='pacienteatualLeito'
                            error={errors.pacienteatualLeito}
                            validations={register('pacienteatualLeito', {
                                required: {
                                    value: true,
                                    message: 'Nome do cliente é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='boolean'
                            defaultValue={props.leito.status}
                            label='Status do Leito'
                            placeholder='Insira o status do leito'
                            required={true}
                            name='statusLeito'
                            error={errors.statusLeito}
                            validations={register('statusLeito', {
                                required: {
                                    value: true,
                                    message: 'status do leito é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='date'
                            defaultValue={props.leito.data}
                            label='Data'
                            placeholder='Insira a data'
                            required={true}
                            name='dataLeito'
                            error={errors.dataLeito}
                            validations={register('dataLeito', {
                                required: {
                                    value: true,
                                    message: 'data da estadia do leito é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            defaultValue={props.leito.salaId}
                            label='Id da sala'
                            placeholder='Insira o id da salaaa que pertence'
                            required={true}
                            name='salaIdLeito'
                            error={errors.salaIdLeito}
                            validations={register('salaIdLeito', {
                                required: {
                                    value: true,
                                    message: 'sala que o leito é obrigatório.'
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