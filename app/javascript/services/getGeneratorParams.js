import axios from 'axios'

export default async function getGeneratorParams(generator){
  return axios.get(`api/generators/${generator}`)
}