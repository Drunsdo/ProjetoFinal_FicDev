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
        <MDBContainer>
            <ModalComponent
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <MDBRow>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
                        <div className="text-center">
                            <img src="Captura de tela de 2023-09-29 09-21-59.png"
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
                                    <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Criar</MDBBtn>
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
