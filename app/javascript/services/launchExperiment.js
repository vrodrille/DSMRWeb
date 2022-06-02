import axios from 'axios'

/**
 * Esta función es utilizada para realizar una petición POST a /api/experiments con los parámetros algorithm y
 * experiment, su objetivo es la ejecución de un experimento con los parámetros especificados para el algoritmo y 
 * los generadores de datos.
 * @param {Object} algorithm Parámetro que contiene toda la información del algoritmo a ejecutar en el experimento.
 * @param {Object} experiment Parámetro que contiene toda la información de los generadores de datos a utilizar en
 * el experimento.
 * @returns Una promesa con la respuesta de la API, que consiste en un código HTTP 200 sin contenido alguno.
 */
export default function launchExperiment(algorithm, experiment){
  return axios.post("/api/experiments", {}, {
    params: {
      algorithm,
      experiment
    }
  })
}