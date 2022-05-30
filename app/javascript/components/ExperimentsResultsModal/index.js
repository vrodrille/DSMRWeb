import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getExperimentsResults from '../../services/getExperimentsResults'
import { formatExperimentName } from '../../utils/experiment'
import './ExperimentsResultsModal.css'

function ExperimentsResultsModal() {

  const [experiments, setExperiments] = useState([])

  useEffect(() => {
    getExperimentsResults()
      .then(response => {
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
          <div className="modal-body overflow-scroll" id="experiments-results-div">
            {experiments.map((experiment) => {
              return (
                <React.Fragment key={experiment}>
                  <div>
                    <label htmlFor={experiment}>{formatExperimentName(experiment)}</label>
                    <a href={"api/experiments_results/" + experiment} target="_blank" className="link-primary float-end">Descargar</a>
                  </div>
                  <hr />
                </React.Fragment>
              )
            })}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExperimentsResultsModalPortal() {
  return ReactDOM.createPortal(
    <ExperimentsResultsModal />,
    document.getElementById('root')
  )
}