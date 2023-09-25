import { api } from "./api";

export async function getFiltroSalas(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/salas/${data.tipoSala}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getQuantidadeSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/quantidade', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log('Dados de salas:', result.data);
    return result;
}

export async function getQuantidadeLeitoSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/leito', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeCirurgicaSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/cirurgica', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
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
        tipo: data.tipoSala,
        quantidadeleitos: data.quantidadeleitosSala
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
        tipo: data.tipoSala,
        quantidadeleitos: data.quantidadeleitosSala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
