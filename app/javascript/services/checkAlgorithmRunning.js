import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a la API a la dirección
 * /api/experiments, su objetivo es comprobar si hay algún algoritmo en ejecución.
 * @returns Una promesa con la respuesta de la API, siendo esta un JSON con un campo booleano
 * llamado algorithm_executing.
 */
export default async function checkAlgorithmRunning(){
  return axios.get("api/experiments")
}