import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home"
import {Salas} from "./pages/Salas";
import { Leitos } from "./pages/Leitos";
import {Reservas} from "./pages/Reservas";


import { isAuthenticated } from './utils/is-authenticated';

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        // Pode trocar para renderizar uma página customizada de não autorizada,
        // nesse caso ele vai voltar para a tela de login
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/salas"
                    element={(
                        <PrivateRoute>
                            <Salas />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/leitos"
                    element={(
                        <PrivateRoute>
                            <Leitos />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/reservas"
                    element={(
                        <PrivateRoute>
                            <Reservas />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/home"
                    element={(
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    )}
                />
            </Routes>
        </BrowserRouter>
    )
}
