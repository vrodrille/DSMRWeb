import axios from 'axios'

export default function launchExperiment(algorithm, experiment){
  return axios.post("/api/experiments", {}, {
    params: {
      algorithm,
      experiment
    }
  })
}