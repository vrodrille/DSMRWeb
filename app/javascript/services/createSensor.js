import axios from 'axios'

/**
 * Esta función es utilizada para realizar una petición POST a /api/sensors con el parámetro sensor, su
 * objetivo es la creación de un nuevo sensor con la información aportada.
 * @param {Object} sensor Este parámetro representa al sensor que se quiere crear, y contiene toda su información 
 * (salvo su identificador).
 * @returns Una promesa con la respuesta de la API, siendo esta el objeto sensor creado y almacenado en la base 
 * de datos.
 */
export default function createSensor(sensor){
  return axios.post("/api/sensors", {sensor})
}