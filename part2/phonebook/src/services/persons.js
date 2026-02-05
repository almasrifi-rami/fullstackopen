import axios from 'axios'

const baseUrl = '/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const update = (person, newNumber) => {
    const newPerson = { ...person, number: newNumber }
    const request = axios.put(`${baseUrl}/${person.id}`, newPerson)
    return request.then(response => response.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, del }