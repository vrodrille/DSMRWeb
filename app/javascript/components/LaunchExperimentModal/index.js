import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getAlgorithms from '../../services/getAlgorithms'
import getAlgorithmParams from '../../services/getAlgorithmParams'
import getGenerators from '../../services/getGenerators'
import getGeneratorParams from '../../services/getGeneratorParams'
import { clearFormFields, algorithmFieldsClearer } from '../../utils/experiment'

function LaunchExperimentModal(){

  const [algorithms, setAlgorithms] = useState([])
  const [generators, setGenerators] = useState([])

  useEffect(() => {
    getAlgorithms()
      .then( response =>
        setAlgorithms(response.data)
      )

    getGenerators()
      .then( response =>
        setGenerators(response.data)  
      )
  },[])

  const generateInputsOnSelectValue = (divSelector, isAlgorithmSelect) => {
    let inputDiv = document.getElementById(divSelector)
    algorithmFieldsClearer(divSelector)
    if (isAlgorithmSelect){
      let selectValue = document.getElementById("algorithm-select").value
      getAlgorithmParams(selectValue)
        .then( (response) => {
          response.data.map((field) => {
            let row = document.createElement("div")
            row.className = "row mt-3"
            let label = document.createElement("label")
            label.setAttribute("for", field)
            label.className = "text-secondary col-8 col-form-label"
            label.textContent = field + ":"
            row.appendChild(label)
            let fieldContainer = document.createElement("div")
            fieldContainer.className = "col-4"
            let input = document.createElement("input")
            input.setAttribute("id", field)
            input.setAttribute("name", field)
            input.required = true
            input.className = "form-control"
            fieldContainer.appendChild(input)
            row.appendChild(fieldContainer)
            inputDiv.appendChild(row)
          })
        })
    } else {
      let selectValue = null
      if (divSelector == "concept-inputs"){
        selectValue = document.getElementById("concept-select").value
      } else {
        selectValue = document.getElementById("concept-drift-select").value
      }
      getGeneratorParams(selectValue)
        .then( (response) => {
          response.data.map( (field) => {
            let row = document.createElement("div")
            row.className = "row mb-3"
            let label = document.createElement("label")
            label.setAttribute("for", field.command)
            label.textContent = field.command + ":"
            label.className = "text-secondary col-2 col-form-label text-end"
            row.appendChild(label)
            let fieldContainer = document.createElement("div")
            fieldContainer.className = "col-4"
            let input = document.createElement("input")
            input.setAttribute("id", field.command)
            input.setAttribute("name", field.command)
            input.setAttribute("data-bs-toggle", "tooltip")
            input.setAttribute("data-bs-placement", "right")
            input.setAttribute("title", field.description)
            input.required = true
            input.defaultValue = field.default_value
            input.className = "form-control"
            fieldContainer.appendChild(input)
            row.appendChild(fieldContainer)
            inputDiv.appendChild(row)
            new bootstrap.Tooltip(input)
          })
        })
    }
  }

  const closingOperation = () => {
    algorithmFieldsClearer("algorithm-inputs")
    algorithmFieldsClearer("concept-inputs")
    algorithmFieldsClearer("concept-drift-inputs")
    clearFormFields("#experiment-form")
  }

  return(
    <div className="modal fade" id="launch-experiment-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ejecutar experimento</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closingOperation}></button>
          </div>
          <form id="experiment-form">
            <div className="modal-body row">
              <div className="algorithm-section col-6">
                <h6 className="mb-2 algorithm-section-header"> Algoritmo </h6>
                
                <div className="row">
                  <div className="col-6">
                    <select id="algorithm-select" className="form-select" name="algorithm-select" defaultValue="" onChange={() => {generateInputsOnSelectValue("algorithm-inputs", true)}} required>
                      <option disabled value="">Algoritmo</option>
                      { algorithms.map( (algorithm) => {
                          return <option key={algorithm} value={algorithm}>{algorithm}</option>
                        }) 
                      }
                    </select>
                  </div>
                </div>
                <div id="algorithm-inputs">
                </div>
              </div>
              
              <div className="experiment-section  col-6">
                <h6 className="mb-2 experiment-section-header"> Experimento </h6>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="total-instances">Instancias totales:</label>
                  <div className="col-4">
                    <input className="form-control" id="total-instances" name="total-instances" required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="information-frequency">Frecuencia de información:</label>
                  <div className="col-4">
                    <input className="form-control" id="information-frequency" name="information-frequency" required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="drift-location">Localización del cambio:</label>
                  <div className="col-4">
                    <input className="form-control" id="drift-location" name="drift-location" required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="drift-window-instances">Ancho de la ventana de cambio:</label>
                  <div className="col-4">
                    <input className="form-control" id="drift-window-instances" name="drift-window-instances" required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="experiment-duration">Tiempo (s):</label>
                  <div className="col-4">
                    <input className="form-control" id="experiment-duration" name="experiment-duration" required/>
                  </div>
                </div>
                <div className="concept-section">
                  <h6 className="mb-2 concept-section-header"> Concepto </h6>
                  
                  <div className="row">
                    <div className="col-6">
                      <select id="concept-select" className="form-select mb-3" name="concept-select" defaultValue="" onChange={() => {generateInputsOnSelectValue("concept-inputs", false)}} required>
                        <option disabled value="">Generador</option>
                        { generators.map( (generator) => {
                            return <option key={generator} value={generator}>{generator}</option>
                          }) 
                        }
                      </select>
                    </div>
                  </div>
                  <div id="concept-inputs">
                  </div>
                </div>
                <div className="concept-drift-section">
                  <h6 className="mb-2 concept-drift-section-header"> Siguiente concepto </h6>
                  <div className="row">
                    <div className="col-6">
                      <select id="concept-drift-select" className="form-select mb-3" name="concept-drift-select" defaultValue="" onChange={() => {generateInputsOnSelectValue("concept-drift-inputs", false)}} required>
                        <option disabled value="">Generador</option>
                        { generators.map( (generator) => {
                            return <option key={generator} value={generator}>{generator}</option>
                          }) 
                        }
                      </select>
                    </div>
                  </div>
                  <div id="concept-drift-inputs">
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Ejecutar</button>
              <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={closingOperation}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LaunchExperimentModalPortal () {
  return ReactDOM.createPortal(
    <LaunchExperimentModal/>,
    document.getElementById('root')
  )
}