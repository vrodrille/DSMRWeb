import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getExperimentsResults from '../../services/getExperimentsResults'
import downloadExperimentsResults from '../../services/downloadExperimentsResults'
import { formatExperimentName, uncheckFormFields } from '../../utils/experiment'
import './ExperimentsResultsModal.css'

function ExperimentsResultsModal(){

  const [experiments, setExperiments] = useState([])

  useEffect(() => {
    getExperimentsResults()
      .then( response => {
        setExperiments(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let experimentForm = document.getElementById("experiments-results-form")
    let experimentInputs = experimentForm.querySelectorAll("input:checked")
    experimentInputs.forEach( (experimentSelected) => {
      downloadExperimentsResults(experimentSelected.value)
    })
  }

  const closingOperation = () => {
    uncheckFormFields("#experiments-results-form")
  }

  return (
    <div className="modal fade" id="experiments-results-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Experimentos anteriores</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closingOperation}></button>
          </div>
          <div className="modal-body overflow-scroll" id="experiments-results-div">
            <form id="experiments-results-form" onSubmit={handleSubmit}>
              { experiments.map( (experiment) => {
                  return (
                    <React.Fragment key={experiment}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={experiment} id={experiment}></input>
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
            <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={closingOperation}>Cerrar</button>
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