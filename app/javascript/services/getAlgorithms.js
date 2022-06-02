import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a /api/algorithms, su objetivo es la
 * obtención de la lista de algoritmos disponibles en la Aplicación Web.
 * @returns Una promesa con la respuesta de la API, siendo esta un JSON conteniendo un array con los identificadores
 * de los algoritmos.
 */
export default async function getAlgorithms(){
  return axios.get("api/algorithms")
}