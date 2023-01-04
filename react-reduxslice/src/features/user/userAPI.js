import axios from 'axios'


const request = axios.create({
    baseURL: 'http://localhost:3000/'
});

export const loadUser = (params) => request.get("users", { params: { page: 1 } })

export const addUser = (name, phone) => request.post('users', { name, phone })

export const updateUser = (id, name, phone) => request.put(`users/${id}`, { name, phone })

export const removeUser = (id) => request.delete(`users/${id}`)

export const resendUser = (id) => request.delete(`users/${id}`)

export const loadmoreUser = (id) => request.get('users', { page: 1 })


