import { api } from "./api";

export async function getLeitos() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/leitos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteLeito(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/leito/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateLeito(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/leito/${data.id}`, {
        salaId: data.salaIdLeito,
        data: data.dataLeito,
        pacienteatual: data.pacienteatualLeito,
        status: data.statusLeito
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createLeito(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/leito', {
        salaId: data.salaIdLeito,
        data: data.dataLeito,
        pacienteatual: data.pacienteatualLeito,
        status: data.statusLeito
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}