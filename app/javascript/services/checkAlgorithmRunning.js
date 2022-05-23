import axios from 'axios'

export default async function checkAlgorithmRunning(){
  return axios.get("api/experiments")
}