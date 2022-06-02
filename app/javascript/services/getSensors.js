import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición GET a /api/sensors, su objetivo es el de obtener una
 * lista con los sensores almacenados en la base de datos.
 * @returns Una promesa con la respuesta de la API, siendo esta un JSON con un array de objetos que representa la lista
 * de sensores.
 */
export default async function getSensors(){
  return axios.get("api/sensors")
    .then( res => res.data )
}