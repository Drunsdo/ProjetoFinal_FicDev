import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavbarComponent } from "../components/Navbar";
import { Input } from "../components/Input";
import '../styles/perfil.css';
import { ModalComponent } from '../components/Modal';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';




import { deleteUser, getUser, updateUser } from "../services/user-service"

export function Perfil(props) {
    const [user, setUser] = useState([]);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [result, setResult] = useState(null);
    const [result1, setResult1] = useState(null);


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
                nomeUser: data.nomeUser,
                emailUser: data.emailUser,
                passwordUser: data.passwordUser
            });
            await findUser();
            setIsUpdated(false);
            setResult1({
                message: 'Perfil editado com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na edição!',
                message: error.response.data.error,
            });
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
        <MDBContainer fluid className="perfil-container">
            <ModalComponent
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <ModalComponent
                show={result1}
                title={result1?.title}
                message={result1?.message}
                handleClose={() => setResult1(null)}
            />
            <NavbarComponent />
            <br></br>
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4" className="gradient-custom text-center text-white"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                <MDBCardImage src="user_1177568.png"
                                    alt="Avatar" className="my-5" style={{ width: '60px' }} fluid />
                                <MDBTypography tag="h5" className="text-black">{user.nome}</MDBTypography>

                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Informações</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Email</MDBTypography>
                                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Senha</MDBTypography>
                                            <MDBCardText className="text-muted">xxxxxxx</MDBCardText>
                                        </MDBCol>
                                        <MDBCol className="d-flex justify-content-end align-items-end">
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={editTooltip}
                                            >
                                                <Button variant="link" onClick={() => setIsUpdated(true)}>
                                                    <img
                                                        src="/editar.png"
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
                                                    className="ms-0"
                                                    onClick={() => setIsDeleted(true)}
                                                >
                                                    <img
                                                        src="/delete.png"
                                                        width="30"
                                                        height="30"
                                                        alt="Deletar"
                                                    />
                                                </Button>
                                            </OverlayTrigger>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCol>

                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar perfil: {user.nome}</Modal.Title>
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
                            label='Nome'
                            type='text'
                            name='nomeUser'
                            errors={errors.nomeUser}
                            placeholder='Insira o nome'
                            validations={register('nomeUser', {
                                required: {
                                    value: true,
                                    message: 'Nome é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            //controlId="formGroupEmailUser"
                            label='E-mail'
                            type='text'
                            name='emailUser'
                            errors={errors.emailUser}
                            placeholder='Insira o email'
                            validations={register('emailUser', {
                                required: {
                                    value: true,
                                    message: 'Email user é obrigatório.'
                                },
                                pattern: {
                                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                    message: 'E-mail inválido!'
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

            <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
                <Modal.Header>
                    <Modal.Title>Deseja deletar o usuário?</Modal.Title>
                </Modal.Header>


                <Modal.Footer>
                    <Button variant="danger" onClick={() => removeUser()}>Deletar</Button>
                    <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
                </Modal.Footer>

            </Modal>
        </MDBContainer>

    );
}