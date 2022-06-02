import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a /api/experiments_results, su objetivo es
 * obtener los identificadores de los directorios con los resultados de los experimentos realizados en la 
 * Aplicación.
 * @returns Una promesa con la respuesta de la API, siendo esta un JSON con un array de los identificadores de
 * los resultados de los experimentos almacenados.
 */
export default async function getExperimentsResults(){
  return axios.get("api/experiments_results")
}