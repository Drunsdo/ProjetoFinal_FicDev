import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { ModalComponent } from '../components/Modal';
import '../styles/register.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';

import { registerUser } from "../services/user-service";

export function Register() {
    const { handleSubmit, register, formState: { errors, isSubmitted } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data);
            setResult(user);
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }

    return (
        <MDBContainer fluid className="gradient-form">
            <ModalComponent
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <MDBRow className="h-100">
                <MDBCol col='6' className="mb-0 d-flex justify-content-center align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 class="mb-4">Sistema de gerenciamento de salas/leitos</h4>
                        <p class="small mb-0">A gestão de salas e leitos é essencial para otimizar espaços em diferentes contextos,
                            como hospitais, hotéis e conferências. Esses sistemas automatizam reservas, monitoram ocupação e simplificam
                            a administração, economizando tempo e recursos.
                        </p>
                    </div>
                </MDBCol>
                <MDBCol col='6' className="mb-5 d-flex align-items-center">
                    <div className="d-flex flex-column ms-5 w-100">
                        <div className="text-center">
                            <img src="cama-de-hospital.png"
                                style={{ width: '185px' }} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">Gestão de Salas e Leitos</h4>
                            <p>Por favor crie uma conta</p>
                        </div>
                        <Form
                            noValidate
                            validated={isSubmitted} // Apenas ativar a validação após o envio
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                            className="register-form"
                        >
                            <MDBCol>
                                <Input
                                    wrapperClass='mb-4'
                                    className="mb-4"
                                    label="E-mail"
                                    type="text"
                                    placeholder="Insira seu e-mail"
                                    error={errors.email}
                                    required={true}
                                    name="email"
                                    validations={register('email', {
                                        required: {
                                            value: true,
                                            message: 'E-mail é obrigatório'
                                        },
                                        pattern: {
                                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                            message: 'E-mail inválido!'
                                        }
                                    })}
                                />
                                <Input
                                    wrapperClass='mb-4'
                                    className="mb-4"
                                    label="Senha"
                                    type="password"
                                    placeholder="Insira sua senha"
                                    error={errors.password}
                                    required={true}
                                    name="password"
                                    validations={register('password', {
                                        required: {
                                            value: true,
                                            message: 'Senha é obrigatório'
                                        }
                                    })}
                                />
                                <div className="text-center pt-1 mb-5 pb-1">
                                    <Button className="mb-4 w-100 gradient-custom-2" type="submit">Criar</Button>
                                    <Link to="/">Já tenho uma conta</Link>
                                </div>
                            </MDBCol>
                        </Form>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
