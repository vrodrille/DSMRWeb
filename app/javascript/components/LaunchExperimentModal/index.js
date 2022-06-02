import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import getAlgorithms from '../../services/getAlgorithms'
import getAlgorithmParams from '../../services/getAlgorithmParams'
import getGenerators from '../../services/getGenerators'
import getGeneratorParams from '../../services/getGeneratorParams'
import { TOTAL_INSTANCES, INFORMATION_FREQUENCY, DRIFT_LOCATION, DRIFT_WINDOW_INSTANCES, EXPERIMENT_DURATION, clearFormFields, algorithmFieldsClearer, addFormDefaultValues, ALGORITHM_CHECKING_FREQUENCY } from '../../utils/experiment'
import launchExperiment from '../../services/launchExperiment'
import checkAlgorithmRunning from '../../services/checkAlgorithmRunning'

/**
 * Este componente tiene como función el renderizado del modal para la ejecución de experimentos, posee la estructura más compleja entre todos los
 * componentes ya que está compuesto por tres secciones (la del algoritmo y las de los dos generadores) que generan de forma dinámica sus elementos 
 * HTML en función del valor escogido en un select. En este componente se utilizan componentes no controlados para la implementación de los formularios,
 * esto implica que los valores de los campos de los formularios no son almacenados en un estado y utilizados, sino que son obtenidos directamente del
 * documento.
 * La validación de datos en este componente se realiza en el cliente, comprobando únicamente que ningún campo es nulo.
 * Por último, es necesario mencionar el uso de Tooltips para añadir una descripción a los parámetros de los generadores.
 */
function LaunchExperimentModal(){

  /**
   * Este hook useState es utilizado para almacenar un Array con la lista de algoritmos disponibles en la Aplicación.
   */
  const [algorithms, setAlgorithms] = useState([])
  /**
   * Este hook useState es utilizado para almacenar un Array con la lista de generadores disponibles en la Aplicación.
   */
  const [generators, setGenerators] = useState([])
  /**
   * Este hook useState es utilizado para almacenar un Boolean que indica si hay un experimento en ejecución o no, en caso afirmativo
   * se desactiva el botón de ejecución del experimento.
   */
  const [experimentExecuting, setExperimentExecuting] = useState(false)

  /**
   * Este hook useEffect es utilizado para realizar tres tareas: comprobar si hay un experimento ejecutándose, obtener la lista de algoritmos
   * disponibles en la Aplicación y obtener la lista de generadores disponibles. Debido a que su lista de dependencias está vacía el useEffect 
   * se ejecutará únicamente en el renderizado inicial del componente.
   */
  useEffect(() => {
    checkAlgorithmRunning()
      .then( response => {
        if (response.data.algorithm_executing){
          setExperimentExecuting(true)
        } else {
          setExperimentExecuting(false)
        }
      })
      
    getAlgorithms()
      .then( response =>
        setAlgorithms(response.data)
      )

    getGenerators()
      .then( response =>
        setGenerators(response.data)  
      )
  },[])

  /**
   * Este hook useEffect es utilizado para llevar a cabo una llamada a la API periódica con el objetivo de comprobar si hay un experimento
   * en ejecución. Si bien la lista de dependencias está vacía la función useEffect se ejecutará en el renderizado inicial del componente pero,
   * al usar la función setInterval esta se ejecutará periódicamente con una frecuencia determinada por la constante ALGORITHM_CHECKING_FREQUENCY.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      checkAlgorithmRunning()
        .then( response => {
          if (response.data.algorithm_executing){
            setExperimentExecuting(true)
          } else {
            setExperimentExecuting(false)
          }
        })
    }, ALGORITHM_CHECKING_FREQUENCY);
    return () => clearInterval(interval);
  }, [])

  /**
   * Esta función es utilizada para generar de forma dinámica los input en el form, su objetivo es el de generar en el div
   * correspondiente los parámetros del generador/algoritmo seleccionado. Para un algoritmo, por cada parámetro se generan:
   * un label y un input con un valor por defecto; en cambio, para un generador, se crean: un label y un input (o una checkbox si
   * el parámetro es de tipo booleano) con un valor por defecto y un Tooltip desplegable cada vez que se sitúe el cursor encima.
   * @param {String} divSelector Parámetro que contiene el identificador del div en el que generar los inputs.
   * @param {Boolean} isAlgorithmSelect Parámetro que indica si la función se ha llamado a la hora de la selección de un
   * algoritmo.
   */
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
            label.setAttribute("for", field.name)
            label.className = "text-secondary col-8 col-form-label"
            label.textContent = field.label + ":"
            row.appendChild(label)
            let fieldContainer = document.createElement("div")
            fieldContainer.className = "col-4"
            let input = document.createElement("input")
            input.setAttribute("id", field.name)
            input.setAttribute("name", `[algorithm][${field.name}]`)
            input.required = true
            input.className = "form-control"
            input.defaultValue = field.default_value
            fieldContainer.appendChild(input)
            row.appendChild(fieldContainer)
            inputDiv.appendChild(row)
          })
        })
    } else {
      let selectValue = null
      let generatorInputName = null
      if (divSelector == "concept-inputs"){
        selectValue = document.getElementById("concept-select").value
        generatorInputName = "generator_1"
      } else {
        selectValue = document.getElementById("concept-drift-select").value
        generatorInputName = "generator_2"
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
            if (field.type == "boolean"){
              input.setAttribute("type","checkbox")
              input.className = "form-check-input"
              if (field.default_value == "1"){
                input.checked = true
              }
            } else {
              input.defaultValue = field.default_value
              input.className = "form-control"
              input.required = true
            }
            input.setAttribute("name", `[${generatorInputName}][${field.command}]`)
            input.setAttribute("data-bs-toggle", "tooltip")
            input.setAttribute("data-bs-placement", "right")
            input.setAttribute("title", field.description)
            fieldContainer.appendChild(input)
            row.appendChild(fieldContainer)
            inputDiv.appendChild(row)
            new bootstrap.Tooltip(input)
          })
        })
    }
  }

  /**
   * Esta función se utiliza para llevar a cabo las operaciones de cierre del modal, siendo estas la eliminación de los input generados 
   * de forma dinámica, así como el borrado del contenido de los inputs estáticos del form y la adición de sus valores por defecto.
   */
  const closingOperation = () => {
    algorithmFieldsClearer("algorithm-inputs")
    algorithmFieldsClearer("concept-inputs")
    algorithmFieldsClearer("concept-drift-inputs")
    clearFormFields("#experiment-form")
    addFormDefaultValues(["total-instances","information-frequency","drift-location","drift-window-instances","experiment-duration"],[TOTAL_INSTANCES, INFORMATION_FREQUENCY, DRIFT_LOCATION, DRIFT_WINDOW_INSTANCES, EXPERIMENT_DURATION])
  }

  /**
   * Esta función es utilizada para la ejecución de un experimento encargándose de la recogida de los datos de cada input del form, la 
   * introducción de estos en dos objetos (uno con los parámetros del algoritmo y otro con los parámetros para la generación de datos) y la 
   * realización de una llamada a la API con estos.
   * @param {Event} event Parámetro que contiene el evento del envío del form.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    let algorithmInputs = document.querySelectorAll('[name*="[algorithm]"]')
    let algorithmJson = {}
    let algorithm_name = document.getElementById("algorithm-select").value 
    algorithmJson["algorithm"] = algorithm_name
    algorithmInputs.forEach( (inputField) => {
      let inputName = inputField.id.toString()
      algorithmJson[inputName] = inputField.value
    })
    let experimentJson = {}
    let totalInstances = parseInt(document.getElementById("total-instances").value)
    experimentJson["total_instances"] = totalInstances
    let informationFrequency = parseInt(document.getElementById("information-frequency").value)
    experimentJson["information_frequency"] = informationFrequency
    experimentJson["drift_location"] = document.getElementById("drift-location").value
    experimentJson["drift_window_instances"] = document.getElementById("drift-window-instances").value
    let experimentDuration = document.getElementById("experiment-duration").value
    experimentJson["time_interval"] = (experimentDuration*1000)/(totalInstances/informationFrequency)
    let generator1 = "generators." + document.getElementById("concept-select").value 
    let generator1Inputs = document.querySelectorAll('[name*="[generator_1]"]')
    generator1Inputs.forEach( (inputField) =>  {
      if (inputField.type == "checkbox"){
        if (inputField.checked) {
          generator1 = generator1 + " " + inputField.id.toString()
        }
      } else {
        generator1 = generator1 + " " + inputField.id.toString() + " " + inputField.value
      }
    })
    let generator2 = "generators." + document.getElementById("concept-drift-select").value 
    let generator2Inputs = document.querySelectorAll('[name*="[generator_2]"]')
    generator2Inputs.forEach( (inputField) =>  {
      if (inputField.type == "checkbox"){
        if (inputField.checked){
          generator2 = generator2 + " " + inputField.id.toString()  
        }
      } else {
        generator2 = generator2 + " " + inputField.id.toString() + " " + inputField.value
      }
    })
    experimentJson["generator_1"] = generator1
    experimentJson["generator_2"] = generator2
    launchExperiment(algorithmJson, experimentJson)
    setExperimentExecuting(true)
  }

  return(
    <div className="modal fade" id="launch-experiment-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ejecutar experimento</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closingOperation}></button>
          </div>
          <form id="experiment-form" onSubmit={handleSubmit}>
            <div className="modal-body row">
              <div className="algorithm-section col-6">
                <h6 className="mb-2 algorithm-section-header"> Algoritmo </h6>
                <div className="row">
                  <div className="col-6">
                    <select id="algorithm-select" className="form-select" name="algorithm_select" defaultValue="" onChange={() => {generateInputsOnSelectValue("algorithm-inputs", true)}} required>
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
                    <input className="form-control" id="total-instances" name="[experiment][total_instances]" defaultValue={TOTAL_INSTANCES} required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="information-frequency">Frecuencia de información:</label>
                  <div className="col-4">
                    <input className="form-control" id="information-frequency" name="[experiment][information_frequency]" defaultValue={INFORMATION_FREQUENCY} required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="drift-location">Localización del cambio:</label>
                  <div className="col-4">
                    <input className="form-control" id="drift-location" name="[experiment][drift_location]" defaultValue={DRIFT_LOCATION} required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="drift-window-instances">Ancho de la ventana de cambio:</label>
                  <div className="col-4">
                    <input className="form-control" id="drift-window-instances" name="[experiment][drift_window-instances]" defaultValue={DRIFT_WINDOW_INSTANCES} required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="text-secondary col-8 col-form-label" htmlFor="experiment-duration">Tiempo (s):</label>
                  <div className="col-4">
                    <input className="form-control" id="experiment-duration" name="[experiment][experiment_duration]" defaultValue={EXPERIMENT_DURATION} required/>
                  </div>
                </div>
                <div className="concept-section">
                  <h6 className="mb-2 concept-section-header"> Concepto </h6>
                  <div className="row">
                    <div className="col-6">
                      <select id="concept-select" className="form-select mb-3" name="concept_select" defaultValue="" onChange={() => {generateInputsOnSelectValue("concept-inputs", false)}} required>
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
                      <select id="concept-drift-select" className="form-select mb-3" name="concept_drift_select" defaultValue="" onChange={() => {generateInputsOnSelectValue("concept-drift-inputs", false)}} required>
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
              { experimentExecuting ? <button type="submit" className="btn btn-primary" disabled>Ejecutar</button> : <button type="submit" className="btn btn-primary">Ejecutar</button> } 
              <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={closingOperation}>Cancelar</button>
            </div>
          </form>
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
export default function LaunchExperimentModalPortal () {
  return ReactDOM.createPortal(
    <LaunchExperimentModal/>,
    document.getElementById('root')
  )
}