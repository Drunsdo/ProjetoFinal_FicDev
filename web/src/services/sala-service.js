import { api } from "./api";

export async function getSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteSala(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/sala/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateSala(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/sala/${data.id}`, {
        tipo: data.tiposala,
        quantidadeleitos: data.quantidadeleitossala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createSala(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/sala', {
        tipo: data.tiposala,
        quantidadeleitos: data.quantidadeleitossala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
