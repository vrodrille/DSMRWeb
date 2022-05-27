import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import getExperimentsResults from '../../services/getExperimentsResults'

function ExperimentsResultsModal(){

  useEffect(() => {
    getExperimentsResults()
      .then( response => {
        
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Descargar</button>
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