import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function User(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editUser(data) {
        await props.editUser(data);
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Email: </strong>{props.user.email}</Card.Title>
                <Card.Text><strong>Senha: </strong>{props.user.senha}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeUser}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar perfil: {props.user.id}</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(editUser)}
                    autoComplete="off"
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            label="Email"
                            type="text"
                            name="emailUser"
                            errors={errors.emailUser}
                            placeholder="Insira o email"
                            validations={register('emailUser', {
                                required: {
                                    value: true,
                                    message: 'Email é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            label="Senha"
                            type="password"
                            name="passwordUser"
                            errors={errors.passwordUser}
                            placeholder="Insira a nova senha"
                            validations={register('passwordUser', {
                                required: {
                                    value: true,
                                    message: 'Senha é obrigatória.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Editar</Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>Fechar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
