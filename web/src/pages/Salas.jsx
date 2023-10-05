import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";
import "../styles/salas.css"
import { Sala } from "../components/Sala";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import Select from 'react-select';
import { ModalComponent } from '../components/Modal';



import { createSala, deleteSala, getSalas, updateSala, getFiltroSalas } from "../services/sala-service";

export function Salas() {
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors, isSubmitted } } = useForm();
    const navigate = useNavigate();


    const [result, setResult] = useState(null);
    const [result1, setResult1] = useState(null);

    const valorPadraoTipoFiltro = '';
    const [filtroTexto, setFiltroTexto] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState(valorPadraoTipoFiltro);

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
            if (tipoFiltro === "Todos" && !filtroTexto) {
                await findSalas();
            } else {
                const result = await getFiltroSalas({ tipoSala: tipoFiltro, texto: filtroTexto });
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
            setResult1({
                message: 'Sala excluida com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na deletação!',
                message: error.response.data.error,
            });
        }
    }

    async function addSala(data) {
        try {
            await createSala(data);
            setIsCreated(false);
            await findSalas();
            setResult1({
                message: 'Sala criada com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na criação!',
                message: error.response.data.error,
            });
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
            setResult1({
                message: 'Sala editada com sucesso'
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro na edição!',
                message: error.response.data.error,
            });
            //console.error(error);
        }
    }

    return (
        <Container fluid className="salas-container">
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
            <Header title="Gerenciamento de Salas" />
            <Row className="w-75 m-auto mb-3 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova Sala</Button>
                </Col>
            </Row>

            <Row className="w-75 m-auto mb-2 ">
                <Col md='11'>
                    <Select
                        name="tipoSala"
                        options={[
                            { value: 'Todos', label: 'Todos' },
                            { value: 'Sala de Cirurgia', label: 'Sala de Cirurgia' },
                            { value: 'UTI', label: 'UTI (Unidade de Terapia Intensiva)' },
                            { value: 'Quarto de Pacientes', label: 'Quarto de Pacientes' },
                            { value: 'Sala de Parto', label: 'Sala de Parto' },
                            { value: 'Laboratório', label: 'Laboratório' },
                            { value: 'Sala de Emergência', label: 'Sala de Emergência' },
                            { value: 'Sala de Espera', label: 'Sala de Espera' },
                            { value: 'Sala de Consultas Médicas', label: 'Sala de Consultas Médicas' },
                        ]}
                        value={{ value: tipoFiltro, label: tipoFiltro }}
                        onChange={(selectedOption) => setTipoFiltro(selectedOption.value)}
                        className="salas-select-filter"
                        isSearchable={true} // Permitir pesquisa
                        styles={{
                            indicatorSeparator: () => { },
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
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>

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
                    </div>
                </Col>
            </Row>


            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova sala</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(addSala)}
                    validated={isSubmitted}>
                    <Modal.Body>
                        <Form.Group >
                            <Form.Label>Tipo da Sala</Form.Label>
                            <Form.Select
                                name="tipoSala"
                                {...register('tipoSala')}

                            >

                                <option disabled>Clique para selecionar</option>
                                <option value='Sala de Cirurgia'>Sala de Cirurgia</option>
                                <option value='UTI'>UTI (Unidade de Terapia Intensiva)</option>
                                <option value='Quarto de Pacientes'>Quarto de Pacientes</option>
                                <option value='Sala de Parto'>Sala de Parto</option>
                                <option value='Laboratório'>Laboratório</option>
                                <option value='Sala de Emergência'>Sala de Emergência</option>
                                <option value='Sala de Espera'>Sala de Espera</option>
                                <option value='Sala de Consultas'>Sala de Consultas Médicas</option>

                            </Form.Select>
                        </Form.Group>


                        <div>
                            <Form.Group>
                                <Form.Label>Quantidade de Leitos</Form.Label>
                                <Input
                                    className="mb-3 "
                                    type='number'
                                    required={true}
                                    name='quantidadeleitosSala'
                                    error={errors.quantidadeleitosSala}
                                    defaultValue={0}
                                    validations={register('quantidadeleitosSala', {
                                        required: {
                                            value: true,
                                            message: 'Quantidade de leitos é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
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
        </Container >
    );
}