import axios from 'axios'

export default async function getGenerators(){
  return axios.get("api/generators")
}