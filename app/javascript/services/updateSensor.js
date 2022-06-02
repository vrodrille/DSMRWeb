import axios from 'axios'

/**
 * Esta función es utilizada para realizar una petición PUT a /api/sensors con los parámetros id y sensor, su
 * objetivo es la modificación de la información de un sensor.
 * @param {Object} sensor Parámetro que contiene toda la información del sensor a modificar, es decir, el identificador
 * del sensor a modificar y sus datos modificados.
 * @returns 
 */
export default function updateSensor(sensor){
  return axios.put(`/api/sensors/${sensor.id}`, {sensor})
}