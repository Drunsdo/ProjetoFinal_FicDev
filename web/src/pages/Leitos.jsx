import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";

import { Leito } from "../components/Leito";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createLeito, deleteLeito, getLeitos, updateLeito } from "../services/leito-service";

export function Leitos() {
    const [leitos, setLeitos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findLeitos();
        // eslint-disable-next-line
    }, []);

    async function findLeitos() {
        try {
            const result = await getLeitos();
            setLeitos(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeLeito(id) {
        try {
            await deleteLeito(id);
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }

    async function addLeito(data) {
        try {
            await createLeito(data);
            setIsCreated(false);
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }

    async function editLeito(data) {
        try {
            await updateLeito({
                idLeito: data.idLeito,
                statusLeito: data.statusLeito,
                dataLeito: data.dataLeito,
                pacienteatualLeito: data.pacienteatualLeito,
                salaIdLeito: data.salaIdLeito
            });
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <NavbarComponent />
            <Header title="Leitos" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo Leito</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {leitos && leitos.length > 0
                    ? leitos.map((leito, index) => (
                        <Leito
                            key={index}
                            leito={leito}
                            removeLeito={async () => await removeLeito(leito.id)}
                            editLeito={editLeito}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum leito cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo leito</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addLeito)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='number'
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
                        <Input
                            className="mb-3"
                            type='boolean'
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

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}