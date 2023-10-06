import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Salas } from "./pages/Salas";
import { Leitos } from "./pages/Leitos";
import { Reservas } from "./pages/Reservas";
import { Perfil } from "./pages/Perfil";
import { Dashboard} from "./pages/Dashboard";

import { isAuthenticated } from './utils/is-authenticated';

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {

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
                    path="/perfil"
                    element={(
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/dashboard"
                    element={(
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    )}
                />
            </Routes>

        </BrowserRouter>
    )
}
