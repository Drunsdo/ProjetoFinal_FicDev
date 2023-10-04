import { api } from './api'

export async function registerUser(data) {
    const result = await api.post('/register', data);
    sessionStorage.setItem('userId', JSON.stringify(result.data.userId));
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('userId', JSON.stringify(result.data.userId));
}


export async function getUser(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }        
    });
    return result;
}

export async function updateUser(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/user/update/${data.id}`, {
        nome: data.nomeUser,
        email: data.emailUser,
        password: data.passwordUser
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteUser(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}