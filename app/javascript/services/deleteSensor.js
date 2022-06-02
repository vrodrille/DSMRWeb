import axios from 'axios'

/**
 * Esta función asíncrona es utilizada para realizar una petición DELETE a /api/sensors con el parámetro id, su objetivo
 * es la eliminación del sensor cuyo identificador sea id.
 * @param {String} id Parámetro que almacena el identificador del sensor a eliminar.
 * @returns Una promesa con la respuesta de la API, que tiene un código HTTP 200 y no tiene contenido.
 */
export default async function deleteSensor({id}){
  return axios.delete(`api/sensors/${id}`)
}