import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function User(props) {
    const { handleSubmit, register, formState: { errors }} = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editUser(data) {
        await props.editUser({ ...data, idUser: props.user.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Email: </strong>{props.user.email}</Card.Title>
                <Card.Text><strong>Id: </strong>{props.user.id}</Card.Text>
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
                <Form noValidate onSubmit={handleSubmit(editUser)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.user.email}
                            label='Email'
                            placeholder='Insira o novo email'
                            name='emailUser'
                            {...register('emailUser')}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.user.password}
                            label='Senha'
                            placeholder='Insira a nova senha'
                            name='passwordUser'
                            {...register('passwordUser')}
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
