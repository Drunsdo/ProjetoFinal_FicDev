import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import { Leito } from "../components/Leito";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import {
    createLeito,
    deleteLeito,
    getLeitos,
    updateLeito,
    getFiltroLeito,

} from "../services/leito-service";

export function Leitos() {
    const [leitos, setLeitos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [statusFiltro, setStatusFiltro] = useState("");

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

    async function handleFiltrar() {
        try {
            // Verifique se o campo de filtro não está vazio antes de chamar a API
            if (statusFiltro.trim() === "") {
                return; // Evite chamada à API se o filtro estiver vazio
            }

            // Verifique se o filtro é "Disponível" ou "Ocupado" e defina o valor correto
            let filtro = statusFiltro.toLowerCase();
            if (filtro === "disponível" || filtro === "disponivel" || filtro === "ocupado") {
                filtro = filtro === "disponível" || filtro === "disponivel" ? true : false;
            }

            const result = await getFiltroLeito({ statusLeito: filtro });
            setLeitos(result.data);
        } catch (error) {
            console.error(error);
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
            // Verifique o valor do campo "statusLeito" e defina o valor de status com base nele
            const status = data.statusLeito === 'Disponível' || data.statusLeito === 'Disponivel' || data.statusLeito === 'disponivel' ? true : data.statusLeito === 'Ocupado' || data.statusLeito === 'ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            // Crie um novo objeto de dados com o status resolvido
            const leitoData = {
                salaIdLeito: data.salaIdLeito,
                statusLeito: status
            };

            await createLeito(leitoData);
            setIsCreated(false);
            await findLeitos();
        } catch (error) {
            console.error(error);
        }
    }



    async function editLeito(data) {
        try {
            console.log(data.id)
            await updateLeito({
                id: data.id,
                statusLeito: data.statusLeito,
                dataLeito: data.dataLeito,
                pacienteatualLeito: data.pacienteatualLeito,
                salaIdLeito: data.salaIdLeito
            });
            await findLeitos();
        } catch (error) {
            console.error("Erro ao editar leito:", error);
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

            <Row className="w-50 m-auto mb-2">
                <Col md='8'>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Filtrar por status"
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md='2'>
                    <Button onClick={handleFiltrar}>Filtrar</Button>
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
                            //reservaLeito={editLeito}
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
                            placeholder='Insira o id da sala à qual pertence'
                            required={true}
                            name='salaIdLeito'
                            error={errors.salaIdLeito}
                            validations={register('salaIdLeito', {
                                required: {
                                    value: true,
                                    message: 'A sala à qual o leito pertence é obrigatória.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Status do Leito'
                            placeholder='Insira o status do leito'
                            required={true}
                            name='statusLeito'
                            error={errors.statusLeito}
                            validations={register('statusLeito', {
                                required: {
                                    value: true,
                                    message: 'O status do leito é obrigatório.'
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
