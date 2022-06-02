import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a /api/algorithms con el parámetro algorithm, su objetivo
 * es la obteción de la lista de parámetros de un algoritmo concreto.
 * @param {String} algorithm Parámetro que contiene el nombre del algoritmo del que se quieren obtener los parámetro.
 * @returns Promesa con la respuesta de la API, siendo esta un JSON con un array, cada posición posee tres campos: el identificador
 * del parámetro incluido en los elementos HTML (name), el propio nombre del parámetro (label) y su valor por defecto (default_value).
 */
export default async function getAlgorithmParams(algorithm){
  return axios.get(`api/algorithms/${algorithm}`)
}