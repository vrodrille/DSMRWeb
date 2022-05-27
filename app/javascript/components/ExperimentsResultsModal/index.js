import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getExperimentsResults from '../../services/getExperimentsResults'
import { formatExperimentName } from '../../utils/experiment'

function ExperimentsResultsModal(){

  const [experiments, setExperiments] = useState([])

  useEffect(() => {
    getExperimentsResults()
      .then( response => {
        setExperiments(response.data)
      })
  }, [])

  return (
    <div className="modal fade" id="experiments-results-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Experimentos anteriores</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id="experiments-results-form">
              { experiments.map( (experiment) => {
                  return (
                    <React.Fragment key={experiment}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id={experiment}></input>
                        <label className="form-check-label" htmlFor={experiment}>{formatExperimentName(experiment)}</label>
                      </div>
                      <hr />
                    </React.Fragment>
                  )
                })
              }
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" form="experiments-results-form" className="btn btn-primary">Descargar</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExperimentsResultsModalPortal(){
  return ReactDOM.createPortal(
    <ExperimentsResultsModal/>,
    document.getElementById('root')
  )
}