import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/Navbar";
import { Header } from "../components/Header";
import { deleteUser, getUser, updateUser } from "../services/user-service";
import { User } from "../components/User";

export function Perfil() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const id = sessionStorage.getItem('idUser');

    useEffect(() => {
        findUser(id);
        // eslint-disable-next-line
    }, [id]);

    async function findUser(id) {
        try {
            const result = await getUser(id);
            setUser(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeUser(id) {
        try {
            await deleteUser(id);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    async function editUser(data) {
        try {
            await updateUser({
                id: id,
                emailUser: data.emailUser,
                passwordUser: data.passwordUser
            });
            await findUser(id);
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
                ? user.map((user, index) =>
                    <User
                        key={index}
                        user={user}
                        removeUser={() => removeUser(id)}
                        editUser={editUser}
                    />
                ) : (
                    <p className="text-center">Não existe nenhum usuário cadastrado!</p>
                )}
            </Col>
        </Container>
    );
}
