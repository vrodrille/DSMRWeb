import axios from 'axios'

export default async function getExperimentsResults(){
  return axios.get("api/experiments_results")
}