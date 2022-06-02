import axios from 'axios'

/**
 * Esta función es utilizada para realizar una petición GET a /api/generators con el parámetro generator, su objetivo es 
 * la obtención de la lista de parámetros de un generador en concreto.
 * @param {String} generator Parámetro que contiene el identificador del generador del que se quiere obtener la lista de parámetros.
 * @returns Una promesa con la respuesta de la API, consistiendo esta en un JSON que contiene un array en el cual cada posición es un 
 * objeto con cuatro campos: el identificador del parámetro en los elementos HTML y su comando (command), el tipo del parámetro (type, puede
 * ser boolean o number), el valor por defecto del parámetro (default_value) y la descripción del parámetro (description).
 */
export default async function getGeneratorParams(generator){
  return axios.get(`api/generators/${generator}`)
}