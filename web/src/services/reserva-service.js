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

export async function getFiltroReservas(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/reservas/${data.salaIdReserva}`, {
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
        salaId: data.salaIdReserva,
        data: data.dataReserva,
        horainicio: data.horainicioReserva,
        horafim: data.horafimReserva,
        responsavel: data.responsavelReserva
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
        salaId: data.salaIdReserva,
        data: data.dataReserva,
        horainicio: data.horainicioReserva,
        horafim: data.horafimReserva
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}