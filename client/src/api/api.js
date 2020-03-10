import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/movies',
})

export const insertMovie = payload => api.post(`/create`, payload)
export const getAllMovies = () => api.get(`/`)
export const updateMovieById = (id, payload) => api.put(`/${id}`, payload)
export const deleteMovieById = id => api.delete(`/${id}`)
export const getMovieById = id => api.get(`/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis