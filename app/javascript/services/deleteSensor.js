import axios from 'axios'

export default async function deleteSensor({id}){
  return axios.delete(`api/sensors/${id}`)
}