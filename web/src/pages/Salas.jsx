import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Sala } from "../components/Sala";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createSala, deleteSala, getSalas, updateSala } from "../services/sala-service";

export function Salas() {
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findSalas();
        // eslint-disable-next-line
    }, []);

    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeSala(id) {
        try {
            await deleteSala(id);
            await findSalas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addSala(data) {
        try {
            await createSala(data);
            setIsCreated(false);
            await findSalas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editSala(data) {
        try {
            await updateSala({
                tipoSala: data.tipoSala,
                quantidadeleitosSala: data.quantidadeleitosSala
            });
            await findSalas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Salas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova Sala</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {salas && salas.length > 0
                    ? salas.map((sala, index) => (
                        <Sala
                            key={index}
                            sala={sala}
                            removeSala={async () => await removeSala(sala.id)}
                            editSala={editSala}
                        />
                    ))
                    : <p className="text-center">Não existe nenhuma sala cadastrada!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova sala</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addSala)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Tipo da sala'
                            placeholder='Insira o tipo da sala'
                            required={true}
                            name='tipoSala'
                            error={errors.tipoSala}
                            validations={register('tipoSala', {
                                required: {
                                    value: true,
                                    message: 'tipo da sala é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='integer'
                            label='Quantidade de Leitos da Sala'
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