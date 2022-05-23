import axios from 'axios'

export default async function getAlgorithmParams(algorithm){
  return axios.get(`api/algorithms/${algorithm}`)
}