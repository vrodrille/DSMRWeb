import axios from 'axios'

export default async function getAlgorithms(){
  return axios.get("api/algorithms")
}