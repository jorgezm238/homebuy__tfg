const prefix = 'simple-online-store__'

function serialize(payload) {
    return JSON.stringify(payload)
}

function parse(payload) {
    return JSON.parse(payload)
}

function set(key, payload) {
    localStorage.setItem(`${prefix}${key}`, serialize(payload))
}

function get(key) {
    return parse(localStorage.getItem(`${prefix}${key}`))
}

function remove(key) {
    return localStorage.removeItem(`${prefix}${key}`)
}

export default { set, remove, get }
