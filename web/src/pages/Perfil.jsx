import React, { useEffect, useState } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { NavbarComponent } from "../components/Navbar";

import { User } from "../components/User";
import { Header } from "../components/Header";
import { deleteUser, getUser, updateUser } from "../services/user-service";

export function Perfil() {
    const [user, setUser] = useState(null);
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
            <NavbarComponent />
            <Header title="Perfil" />
            <Col className="w-50 m-auto">
                {user && user.length > 0
                    ? user.map((userData, index) => (
                        <User
                            key={index}
                            user={userData}
                            removeUser={() => removeUser(userData.id)}
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
