import { Container, Modal, Card, Button, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavbarComponent } from "../components/Navbar";
import { Input } from "../components/Input";
import '../styles/perfil.css';


import { Header } from "../components/Header";


import { deleteUser, getUser, updateUser } from "../services/user-service"

export function Perfil(props) {
    const [user, setUser] = useState([]);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const id = sessionStorage.getItem('userId')

    useEffect(() => {
        findUser(id);
        // eslint-disable-next-line
    }, []);

    async function findUser() {
        try {
            const result = await getUser(id);
            setUser(result.data);
            console.log("teste")
        } catch (error) {
            console.error(error);

        }
    }

    async function removeUser() {
        try {
            await deleteUser(id);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    async function editUser(data) {
        try {
            await updateUser({
                id: id,
                emailUser: data.emailUser,
                passwordUser: data.passwordUser
            });
            await findUser();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid className="perfil-container">
            <NavbarComponent />
            <Header title="Perfil" className="perfil-header" />
            <Card className="mb-3 p-3 bg-light perfil-card">
                <Card.Text><strong>Email: </strong>{user.email}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="primary" className="" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="perfil-button-delete"
                        onClick={removeUser}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar perfil: {user.email}</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(editUser)}
                    autoComplete='off'
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            //controlId="formGroupEmailUser"
                            label='E-mail'
                            type='text'
                            name='emailUser'
                            errors={errors.emailUser}
                            placeholder='Insira o dia da reserva'
                            validations={register('emailUser', {
                                required: {
                                    value: true,
                                    message: 'Email user é obrigatório.'
                                }
                            })}
                        />

                        <Input
                            className="mb-3"
                            label='Senha'
                            type='password'
                            name='passwordUser'
                            errors={errors.passwordUser}
                            placeholder='Insira o codigo da sala'
                            validations={register('passwordUser', {
                                required: {
                                    value: true,
                                    message: 'senha é obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={!isValid}>Editar</Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>Fechar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </Container>
    );
}