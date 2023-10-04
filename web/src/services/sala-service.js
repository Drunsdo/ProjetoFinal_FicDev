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

export async function getQuantidadeUTISalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/uti', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeQuartoSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/quarto', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}


export async function getQuantidadePartoSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/parto', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeCirurgiaSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/cirurgia', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeLaboratorioSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/laboratorio', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeEmergenciaSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/emergencia', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeEsperaSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/espera', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result.data)
    return result;
}

export async function getQuantidadeConsultaSalas() {

    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas/get/tipo/consulta', {
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
