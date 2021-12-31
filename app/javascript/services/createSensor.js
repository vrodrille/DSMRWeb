import axios from 'axios'

export default function createSensor(sensor){
  return axios.post("/api/sensors", {sensor})
}