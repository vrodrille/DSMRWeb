import axios from 'axios'

export default async function createSensor(sensor){
  return axios.post("/api/sensors", {sensor})
    .then( res => res.data )
}