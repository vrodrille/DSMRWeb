import axios from 'axios'

export default async function getSensors(){
  return axios.get("api/sensors")
    .then( res => res.data )
    .catch()
}