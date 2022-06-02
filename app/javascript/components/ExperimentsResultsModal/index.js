import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getExperimentsResults from '../../services/getExperimentsResults'
import { formatExperimentName } from '../../utils/experiment'
import './ExperimentsResultsModal.css'

/**
 * Este componente se encarga del renderizado del modal de resultados de los experimentos, listando el nombre de los experimentos cuyos 
 * resultados han sido almacenados y permitiendo su descarga en un archivo zip.
 */
function ExperimentsResultsModal() {

  /**
   * Este hook useState es utilizado para almacenar un Array con el identificador de los experimentos cuyos resultados han sido almacenados
   * en el servidor.
   */
  const [experiments, setExperiments] = useState([])

  /**
   * Este hook useEffect es utilizado para modificar el estado del useState experiments, su objetivo es que el useState almacene la lista de
   * experimentos recibida de la API. Debido a que su lista de dependencias está vacía el useEffect se ejecutará únicamente en el renderizado
   * inicial del componente.
   */
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

/**
 * Es necesaria para la correcta generación de un modal en React el uso de un Portal, este permite la generación de un componente de React en un elemento HTML 
 * que se sitúa por encima de la jerarquía de React, permitiendo así que componentes situados por debajo de otros en la jerarquía de React se puedan renderizar
 * encima.
 */
export default function ExperimentsResultsModalPortal() {
  return ReactDOM.createPortal(
    <ExperimentsResultsModal />,
    document.getElementById('root')
  )
}