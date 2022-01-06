import axios from 'axios'

export default function createSensor(sensor){
  return axios.put(`/api/sensors/${sensor.id}`, {sensor})
}