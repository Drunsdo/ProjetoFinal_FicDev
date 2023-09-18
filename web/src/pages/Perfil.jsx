import React, { useEffect, useState } from "react";
import { Container, Card, Modal, Form, Button, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import { Input } from '../components/Input';
import { Header } from "../components/Header";
import { deleteUser, getUser, updateUser } from "../services/user-service";

export function Perfil(props) {
    const [user, setUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const { handleSubmit, register, formState: { errors }} = useForm();

    useEffect(() => {
        findUser();
        // eslint-disable-next-line
    }, []);

    async function findUser() {
        try {
            const result = await getUser(props.user.id);
            setUser(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeUser() {
        try {
            await deleteUser(props.user.id);
            findUser(); 
        } catch (error) {
            console.error(error);
        }
    }

    async function editUser(data) {
        try {
            await updateUser({
                idUser: data.idUser,
                emailUser: data.emailUser,
                passwordUser: data.passwordUser
            });
            await findUser(); 
            setIsUpdated(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <NavbarComponent />
            <Header title="Perfil" />
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Email: </strong>{user.email}</Card.Title>
                <Card.Text><strong>Senha: </strong>{"******"}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={removeUser}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editUser)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={user.email}
                            label='Email'
                            placeholder='Insira o novo email'
                            name='emailUser'
                            {...register('emailUser')}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue="******"
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
        </Container>
    );
}
