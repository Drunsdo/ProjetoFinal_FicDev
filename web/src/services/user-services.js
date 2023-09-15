import { api } from './api'

export async function registerUser(data) {
    const result = await api.post('/register', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}


export async function getUser() {
    try {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (!token) {
            return null;
        }
        const result = await api.get(`/user/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        return null;
    }
}

export async function updateUser(data) {
    try {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (!token) {
            return null;
        }
        const result = await api.put(`/user/${data.id}`,{
            email: data.emailUser,
            password: data.passwordUser
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        return null;
    }
}

export async function deleteUser() {
    try {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (!token) {
            return false;
        }
        await api.delete(`/user/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        sessionStorage.removeItem('token');
        return true;
    } catch (error) {
        return false;
    }
}