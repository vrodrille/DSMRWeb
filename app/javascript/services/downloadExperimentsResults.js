import axios from 'axios'

export default async function downloadExperimentsResults(experiment){
  axios({
    url: `api/experiments_results/${experiment}`,
    method: 'GET',
    responseType: 'document',
  }).then( response => {
    const url = new Blob([response.data],{type:'application/zip'})
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', experiment + '.zip')
    document.body.appendChild(link)
    link.click()
    axios.delete(`api/experiments_results/${experiment}`)
  })
}