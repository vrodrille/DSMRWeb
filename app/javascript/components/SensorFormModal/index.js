import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './SensorFormModal.css'
import createSensor from '../../services/createSensor'
import updateSensor from '../../services/updateSensor'
import FormFieldErrorMessage from '../FormFieldErrorMessage'

/**
 * Este componente se encarga del renderizado de los modales de creación y edición de un sensor, en caso de renderizarse en la creación de
 * un sensor, todos los campos del formulario estarán vacíos; en caso de renderizarse en la edición de un sensor, los campos del formulario contendrán
 * la información correspondiente. La validación de datos se llevará a cabo en el servidor, mostrando un mensaje de error en los campos rellenados
 * de forma errónea mediante un componente FormFieldErrorMessage; esta validación consiste únicamente en comprobar que todos los campos (excepto el de 
 * información) no son nulos y que la longitud del campo información no supera los 200 caracteres.
 * @param {Object} latitudeLongitude Parámetro que contiene la latitud y longitud del sensor que se quiere crear.
 * @param {Object} sensorSelected Parámetro que contiene la información del sensor que se quiere editar.
 * @param {Function} onClose Parámetro que contiene la función de cierre del modal.
 * @param {Function} addSensorAndCloseModal Parámetro que contiene la función para añadir el sensor modificado o creado en el componente Map y
 * ocultar el modal.
 */
function SensorFormModal({ latitudeLongitude, sensorSelected, onClose, addSensorAndCloseModal }){

  /**
   * Este hook useState es utilizado para almacenar el estado de la información del sensor del modal. Si el modal es para la creación de un
   * sensor el campo id será nulo, en cambio, si el modal es para la edición de un sensor el campo id contendrá el valor de su identificador.
   */
  const [sensorInModal, setSensorInModal] = useState({id: null, latitude: '', longitude: '', location: '', ip_address: '', information: ''})
  /**
   * Este hook useState es utilizado para almacenar el estado de los errores de los campos del formulario del modal.
   */
  const [errors, setErrors] = useState({ip_address: null, location: null, information: null})

  /**
   * Este hook useEffect es utilizado para llevar a cabo la asignación inicial del sensor almacenado en este componente. Este useEffect se ejecutará
   * cuando se modifiquen las props latitudeLongitude y sensorSelected de este componente.
   */
  useEffect(() => {
    initialAssignation()
  }, [latitudeLongitude, sensorSelected])

  /**
   * Esta función es utilizada para la asignación inicial del sensor almacenado en este componente. Es decir, si este componente renderiza el modal de
   * creación de un sensor, incluirá únicamente la latitud y longitud del punto elegido para su creación en el formulario y en el useState sensorInModal; 
   * sin embargo, si este componente renderiza el modal de edición, incluirá toda la información del sensor.
   */
  const initialAssignation = () => {
    if (latitudeLongitude){
      setSensorInModal(Object.assign({}, sensorInModal, {latitude: latitudeLongitude.lat, longitude: latitudeLongitude.lng, location: '', ip_address: '', information: ''}))
    } else if (sensorSelected){
      let informationFieldInitialValue = ''
      if (sensorSelected.information){
        informationFieldInitialValue = sensorSelected.information 
      }
      setSensorInModal({id: sensorSelected.id, latitude: sensorSelected.latitude, longitude: sensorSelected.longitude, location: sensorSelected.location, ip_address: sensorSelected.ip_address, information: informationFieldInitialValue})
    }
  }

  /**
   * Esta función es utilizada para alterar el estado del useState sensorInModal cuando se modifica el correspondiente campo del formulario.
   * @param {Event} ev Parámetro que contiene el evento de la modificación de los campos del formulario.
   */
  const handleChange = (ev) => {
    setSensorInModal(Object.assign({}, sensorInModal, {[ev.target.name]: ev.target.value}))
  }

  /**
   * Esta función es utilizada para llevar a cabo las operaciones de cierre del modal, es decir, la asignación inicial, eliminar todos los
   * errores y ejecutar la función onClose obtenida mediante las props.
   */
  const closingManagement = () => {
    initialAssignation()
    setErrors({ip_address: null, location: null, information: null})
    onClose()
  }

  /**
   * Esta función es utilizada para llevar a cabo el envío del formulario, es decir, para crear un sensor o editar un sensor con los datos 
   * aportados. Realiza la correspondiente llamada a la API y añade el sensor al componente Map y cierra el modal o, si se ha producido un
   * error, lo añade al useState errors.
   * @param {Event} ev Parámetro que contiene el evento del envío del formulario.
   */
  const handleSubmit = (ev) => {
    ev.preventDefault() 
    if (errors) {
      setErrors({ip_address: null, location: null, information: null})
    }
    let request = null
    if (latitudeLongitude){
      request = createSensor(sensorInModal)
    } else {
      request = updateSensor(sensorInModal)
    }
    request
      .then( (response) => {
        addSensorAndCloseModal(response.data)
        initialAssignation()
      })
      .catch( (error) => {
        setErrors(error.response.data.error)
      })
  }

  return(
    <div className="modal fade" id="sensor-form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ latitudeLongitude ? "Creación de sensor" : sensorSelected ? `Editar sensor con ID: ${sensorSelected.id}` : null }</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closingManagement}></button>
          </div>
          <form id="sensor-form" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row mb-3">
                <label className="col-3 col-form-label">Latitud:</label>
                <div className="col-auto">
                  <input className="form-control" placeholder={sensorInModal.latitude} disabled/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-3 col-form-label">Longitud:</label>
                <div className="col-auto">
                  <input className="form-control" placeholder={sensorInModal.longitude} disabled/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-3 col-form-label" htmlFor="inputLocation">Localización:</label>
                <div className="col-auto">
                  <input className={errors.location ? "form-control is-invalid" : "form-control"} id="inputLocation" name="location" value={sensorInModal.location} onChange={handleChange}/>
                  <FormFieldErrorMessage errorMessage={errors.location ? errors.location[0] : null} tagClassName={"invalid-feedback"}/>
                </div>
              </div>
              <div className="row">
                <label className="col-3 col-form-label" htmlFor="inputIP">Dirección IP:</label>
                <div className="col-auto">
                  <input className={errors.ip_address ? "form-control is-invalid" : "form-control"} id="inputIP" name="ip_address" value={sensorInModal.ip_address} onChange={handleChange}/>               
                  <FormFieldErrorMessage errorMessage={errors.ip_address ? errors.ip_address[0] : null} tagClassName={"invalid-feedback"}/>
                </div> 
              </div>
            </div>
            <hr className="mt-0"/>
            <h6 className="info-section-header"> Información </h6>
            <hr />
            <div className="input-group">
              <textarea className={errors.information ? "form-control info-text-area is-invalid" : "form-control info-text-area"} name="information" value={sensorInModal.information} onChange={handleChange}></textarea>
              <FormFieldErrorMessage errorMessage={errors.information ? errors.information[0] : null} tagClassName={"ms-3 invalid-feedback"}/>
            </div>
            <div className="mt-3 modal-footer">
              <button type="submit" className="btn btn-primary">{latitudeLongitude ? "Crear" : "Guardar"}</button>
              <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={closingManagement}>Cancelar</button>
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
export default function SensorFormModalPortal ({ latitudeLongitude, sensorSelected, onClose, addSensorAndCloseModal }) {
  return ReactDOM.createPortal(
    <SensorFormModal latitudeLongitude={latitudeLongitude} onClose={onClose} addSensorAndCloseModal={addSensorAndCloseModal} sensorSelected={sensorSelected}/>,
    document.getElementById('root')
  )
}