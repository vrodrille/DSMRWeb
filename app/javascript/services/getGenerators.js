import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a /api/generators, siendo su objetivo
 * la obtención de la lista de generadores de datos disponibles en la Aplicación.
 * @returns Una promesa con la respuesta de la API, siendo esta un JSON que contiene un array con los nombres de 
 * los generadores.
 */
export default async function getGenerators(){
  return axios.get("api/generators")
}