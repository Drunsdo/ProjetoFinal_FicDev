import { api } from "./api";

export async function getReservas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/reservas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteReserva(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/reserva/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateReserva(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/reserva/${data.id}`, {
        salaId: data.salaIdreserva,
        data: data.datareserva,
        horainicio: data.horainicioreserva,
        horafim: data.horafimreserva,
        responsavel: data.responsavelreserva
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createReserva(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/reserva', {
        salaId: data.salaIdreserva,
        data: data.datareserva,
        horainicio: data.horainicioreserva,
        horafim: data.horafimreserva
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
