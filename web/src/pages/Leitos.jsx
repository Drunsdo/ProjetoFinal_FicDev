import { Container, Col, Modal, Form, Button, Row, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import { Leito } from "../components/Leito";
import { Header } from "../components/Header";
import { createLeito, deleteLeito, getLeitos, updateLeito, getFiltroLeito, reservaLeito, desocuparLeito } from "../services/leito-service";
import { getSalas } from "../services/sala-service";
import Select from 'react-select';
import "../styles/leitos.css";
import { ModalComponent } from '../components/Modal';
import Table from 'react-bootstrap/Table';





export function Leitos() {
    const [leitos, setLeitos] = useState([]);
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { isSubmitted } } = useForm();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [result1, setResult1] = useState(null);
    const [filtroTexto, setFiltroTexto] = useState('');
    const ItemsPerPage = 7;


    const [statusFiltro, setStatusFiltro] = useState('');

    useEffect(() => {
        findLeitos();
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
            let filtro = statusFiltro.toLowerCase();
            if (filtro === "disponível" || filtro === "disponivel" || filtro === "ocupado") {
                filtro = filtro === "disponível" || filtro === "disponivel" ? true : false;
            }

            if (filtro === "todos" && !filtroTexto) {
                // Se a opção for "todos", não aplique filtro e retorne todos os leitos
                await findLeitos();
            } else {
                // Caso contrário, aplique o filtro de acordo com o status selecionado
                const result = await getFiltroLeito({ statusLeito: filtro, texto: filtroTexto });
                setLeitos(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function removeLeito(id) {
        try {
            await deleteLeito(id);
            await findLeitos();
            setResult1({
                message: 'Leito excluido com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na deletação!',
                message: error.response.data.error,
            });
        }
    }

    async function addLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' || data.statusLeito === 'Disponivel' || data.statusLeito === 'disponivel' ? true : data.statusLeito === 'Ocupado' || data.statusLeito === 'ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                salaIdLeito: data.salaIdLeito,
                statusLeito: status
            };

            await createLeito(leitoData);
            setIsCreated(false);
            await findLeitos();
            setResult1({
                message: 'Leito criado com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na criação!',
                message: error.response.data.error,
            });
        }
    }

    async function reservarLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' ? true : data.statusLeito === 'Ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                id: data.id,
                statusLeito: status,
                dataLeito: data.dataLeito,
                pacienteatualLeito: data.pacienteatualLeito,
            }

            await reservaLeito(leitoData);
            await findLeitos();
            setResult1({
                message: 'Leito reservado com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro para reservar!',
                message: error.response.data.error,
            });
        }
    }

    async function desocupaLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' ? true : data.statusLeito === 'Ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                id: data.id,
                statusLeito: status
            }

            await desocuparLeito(leitoData);
            await findLeitos();
            setResult1({
                message: 'Leito desocupado com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro ao desocupar!',
                message: error.response.data.error,
            });
        }
    }




    async function editLeito(data) {
        try {
            const status = data.statusLeito === 'Disponível' ? true : data.statusLeito === 'Ocupado' ? false : null;

            if (status === null) {
                console.error('Status inválido. Use "Disponível" ou "Ocupado".');
                return;
            }

            const leitoData = {
                id: data.id,
                statusLeito: status,
                dataLeito: data.dataLeito,
                pacienteatualLeito: data.pacienteatualLeito,
                salaIdLeito: data.salaIdLeito
            }

            await updateLeito(leitoData);
            await findLeitos();
            setResult1({
                message: 'Leito editado com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na edição!',
                message: error.response.data.error,
            });
        }
    }

    function Tabela({ leitos, removeLeito, editLeito, reservarLeito, desocupaLeito }) {
        const [currentPage, setCurrentPage] = useState(1);

        const indexOfLastItem = currentPage * ItemsPerPage;
        const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
        const currentItems = leitos
            .slice()
            .sort((a, b) => a.id - b.id)
            .slice(indexOfFirstItem, indexOfLastItem);

        const totalPages = Math.ceil(leitos.length / ItemsPerPage);

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        return (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Table striped bordered hover size="sm" >
                    <colgroup>
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "11%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="leitoNumero">Número</th>
                            <th className="leitoSala">Sala</th>
                            <th className="leitoStatus">Status</th>
                            <th className="leitoPaciente">Paciente</th>
                            <th className="leitoData">Data de Entrada</th>
                            <th className="leitoReserva">Reserva</th>
                            <th className="leitoEditar">Edição</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems
                                .sort((a, b) => a.id - b.id)
                                .map((leito, index) => (
                                    <Leito
                                        key={index}
                                        leito={leito}
                                        removeLeito={async () => await removeLeito(leito.id)}
                                        reservarLeito={reservarLeito}
                                        desocupaLeito={desocupaLeito}
                                        editLeito={editLeito}
                                    />
                                ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Não existe nenhuma sala cadastrada!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <div className='d-flex justify-content-end'>
                    <Pagination>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        );
    }

    return (
        <Container fluid className="leitos-container">
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
            <Header title="Gerenciamento de Leitos" />
            <Row className="w-75 m-auto mb-3 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo Leito</Button>
                </Col>
            </Row>

            <Row className="w-75 m-auto mb-2">
                <Col md='11'>
                    <Select
                        name="statusLeito"
                        options={[
                            { value: 'Todos', label: 'Todos' },
                            { value: 'Disponível', label: 'Disponível' },
                            { value: 'Ocupado', label: 'Ocupado' },
                        ]}
                        value={{ value: statusFiltro, label: statusFiltro }}
                        onChange={(selectedOption) => setStatusFiltro(selectedOption.value)}
                        className="salas-select-filter"
                        isSearchable={true} // Para desativar a pesquisa
                        styles={{
                            indicatorSeparator: () => { }, // Para remover a linha vertical entre o seletor e a seta
                        }}
                        onInputChange={(inputValue) => setFiltroTexto(inputValue)} // Atualizar o texto de filtro enquanto o usuário digita
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFiltrar(); // Chama a função de filtragem quando a tecla Enter é pressionada
                            }
                        }}

                    />
                </Col>

                <Col md='1'>
                    <Button onClick={handleFiltrar}>Filtrar</Button>
                </Col>

            </Row>

            <Row className="w-75 m-auto mt-4 mb-2">
                <Col className="w-50 m-auto">
                    <Tabela leitos={leitos} removeLeito={removeLeito} editLeito={editLeito} reservarLeito={reservarLeito} desocupaLeito={desocupaLeito} />
                </Col>
            </Row>


            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo leito</Modal.Title>
                </Modal.Header>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit(addLeito)} validated={isSubmitted}>
                    <Modal.Body>
                        <Form.Group controlId="formIdSala">
                            <Form.Label>Número da sala</Form.Label>
                            <Form.Select
                                name="salaIdLeito"
                                {...register('salaIdLeito')}
                            >
                                <option disabled>Clique para selecionar</option>
                                {salas && salas.length > 0
                                    ? salas
                                        .filter((sala) => sala.tipo === "Quarto de Pacientes" || sala.tipo === "UTI")
                                        .sort((a, b) => a.id - b.id)
                                        .map((sala) => (
                                            <option key={sala.id} value={sala.id}>
                                                {sala.id}
                                            </option>
                                        ))
                                    : <p className="text-center">Não existe nenhuma sala do status "Leito" cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Status do Leito</Form.Label>
                            <Form.Select
                                name="statusLeito"
                                {...register('statusLeito')}
                            >
                                <option disabled>Clique para selecionar</option>
                                <option value='Disponível'>Disponível</option>
                                <option value='Ocupado'>Ocupado</option>
                            </Form.Select>
                        </Form.Group>
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
        </Container >
    );
}
