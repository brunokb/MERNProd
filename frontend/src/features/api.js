import axios from 'axios'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmU2YTY0NWZlMWNmYzc2MWJhODFiYyIsImlhdCI6MTYzNDYyNjE0OCwiZXhwIjoxNjM1NDkwMTQ4fQ.w-8JwqN49sQKg92MxX3q89brdfWyM27Kx0NAYyksJO0";

const api = axios.create({
    baseURL: 'http://localhost:3100',
    headers:{
        'Authorization': `Bearer ${token}`
    }

});

export default api;