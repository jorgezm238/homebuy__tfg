import axios from "axios";
import Storage from "./storage"

const base_url = '/api'

const token = Storage.get('token') ?? ''
const headers = {
    'Authorization': `Bearer ${token}`
}

function getConfig(isAuth, config = {}) {
    return isAuth ? { ...config, headers } : config
}

async function get(endpoint, isAuth = false) {
    try {
        const config = getConfig(isAuth)
        const response = await axios.get(`${base_url}${endpoint}`, config)
        return response
    } catch(err) {
        throw(err)
    }
}

async function post(endpoint, data, isAuth = false) {
    try {
        const config = getConfig(isAuth)
        const response = await axios.post(`${base_url}${endpoint}`, data, config)
        return response
    } catch(err) {
        throw(err)
    }
}

async function put(endpoint, data, isAuth = false) {
    try {
        const config = getConfig(isAuth)
        const response = await axios.put(`${base_url}${endpoint}`, data, config)
        return response
    } catch(err) {
        throw(err)
    }
}

async function remove(endpoint, isAuth = false) {
    try {
        const config = getConfig(isAuth)
        const response = await axios.delete(`${base_url}${endpoint}`, config)
        return response
    } catch(err) {
        throw(err)
    }
}

export { get, post, put, remove }
