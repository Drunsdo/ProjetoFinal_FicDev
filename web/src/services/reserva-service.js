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

export async function getQuantidadeReservas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/reservas/quantidade', {
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
        datainicio: data.datainicioReserva,
        datafim: data.datafimReserva,
        responsavel: data.responsavelReserva
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createReserva(data) {
    try {
        const accessToken = sessionStorage.getItem('token');
        const result = await api.post('/reserva', {
            salaId: data.salaIdReserva,
            datainicio: data.datainicioReserva,
            datafim: data.datafimReserva,
            responsavel: data.responsavelReserva
        }, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result.data;
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        throw error;
    }
}