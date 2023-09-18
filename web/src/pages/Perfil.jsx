import React, { useEffect, useState } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { User } from "../components/User";
import { Header } from "../components/Header";
import { deleteUser, getUser, updateUser } from "../services/user-service";

export function Perfil() {
    const [user, setUser] = useState([]);
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findUser();
        // eslint-disable-next-line
    }, []);

    async function findUser() {
        try {
            const result = await getUser();
            setUser(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeUser(id) {
        try {
            await deleteUser(id);
            await findUser();
        } catch (error) {
            console.error(error);
        }
    }

    async function editUser(data) {
        try {
            await updateUser({
                idUser: data.idUser,
                emailUser: data.emailUser,
                passwordUser: data.passwordUser
            });
            await findUser(); // Corrected from findSalas() to findUser()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Perfil" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {user && user.length > 0
                    ? user.map((user, index) => (
                        <User
                            key={index}
                            user={user}
                            removeUser={() => removeUser(user.id)} // Removed async/await here
                            editUser={editUser}
                            register={register}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                            errors={errors}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum user cadastrado!</p>}
            </Col>
            
        </Container>
    );
}
