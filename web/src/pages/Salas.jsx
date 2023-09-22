import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";

import { Sala } from "../components/Sala";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createSala, deleteSala, getSalas, updateSala, getFiltroSalas } from "../services/sala-service";

export function Salas() {
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [tipoFiltro, setTipoFiltro] = useState("");

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

    async function handleFiltrar() {
        try {
            let filtro = tipoFiltro;

            if (tipoFiltro === "todos") {
                await findSalas();
            } else {
                const result = await getFiltroSalas({ tipoSala: filtro }); // Corrigido aqui
                setSalas(result.data);
            }
        } catch (error) {
            console.error(error);
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
            console.log(data.id);
            await updateSala({
                id: data.id,
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
            <NavbarComponent />
            <Header title="Salas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova Sala</Button>
                </Col>
            </Row>

            <Row className="w-50 m-auto mb-2">
                <Col md='8'>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="select"
                            name="tipoSala"
                            value={tipoFiltro}
                            onChange={(e) => setTipoFiltro(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="Leito">Leito</option>
                            <option value="Cirúrgica">Cirúrgica</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col md='2'>
                    <Button onClick={handleFiltrar}>Filtrar</Button>
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